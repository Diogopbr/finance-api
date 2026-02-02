#!/usr/bin/env node

/**
 * Script de demonstração da API
 * Execute: node demo.js (requer API rodando em http://localhost:3000)
 */

const API_URL = 'http://localhost:3000';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  console.log('🚀 Iniciando demonstração da Finance API\n');

  // 1. Health Check
  console.log('1️⃣  Verificando saúde da API...');
  try {
    const health = await fetch(`${API_URL}/health`);
    const healthData = await health.json();
    console.log('   ✅', healthData.message);
    console.log();
  } catch (error) {
    console.log('   ❌ API não está rodando. Execute: npm run dev');
    console.log();
    return;
  }

  await sleep(500);

  // 2. Criar receitas
  console.log('2️⃣  Criando receitas...');
  
  const income1 = await fetch(`${API_URL}/api/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      description: 'Salário',
      amount: 5000,
      type: 'income',
      category: 'Trabalho'
    })
  });
  const income1Data = await income1.json();
  console.log('   ✅ Receita criada:', income1Data.data.description, '-', `R$ ${income1Data.data.amount}`);

  await sleep(300);

  const income2 = await fetch(`${API_URL}/api/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      description: 'Freelance',
      amount: 2500,
      type: 'income',
      category: 'Trabalho'
    })
  });
  const income2Data = await income2.json();
  console.log('   ✅ Receita criada:', income2Data.data.description, '-', `R$ ${income2Data.data.amount}`);
  console.log();

  await sleep(500);

  // 3. Criar despesas
  console.log('3️⃣  Criando despesas...');
  
  const expense1 = await fetch(`${API_URL}/api/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      description: 'Supermercado',
      amount: 350,
      type: 'expense',
      category: 'Alimentação'
    })
  });
  const expense1Data = await expense1.json();
  console.log('   ✅ Despesa criada:', expense1Data.data.description, '-', `R$ ${expense1Data.data.amount}`);

  await sleep(300);

  const expense2 = await fetch(`${API_URL}/api/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      description: 'Aluguel',
      amount: 1200,
      type: 'expense',
      category: 'Moradia'
    })
  });
  const expense2Data = await expense2.json();
  console.log('   ✅ Despesa criada:', expense2Data.data.description, '-', `R$ ${expense2Data.data.amount}`);

  await sleep(300);

  const expense3 = await fetch(`${API_URL}/api/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      description: 'Conta de luz',
      amount: 180,
      type: 'expense',
      category: 'Utilidades'
    })
  });
  const expense3Data = await expense3.json();
  console.log('   ✅ Despesa criada:', expense3Data.data.description, '-', `R$ ${expense3Data.data.amount}`);
  console.log();

  await sleep(500);

  // 4. Listar todas as transações
  console.log('4️⃣  Listando todas as transações...');
  const all = await fetch(`${API_URL}/api/transactions`);
  const allData = await all.json();
  console.log(`   📋 Total de transações: ${allData.data.length}`);
  console.log();

  await sleep(500);

  // 5. Filtrar por tipo
  console.log('5️⃣  Filtrando apenas receitas...');
  const incomes = await fetch(`${API_URL}/api/transactions?type=income`);
  const incomesData = await incomes.json();
  console.log(`   💰 Total de receitas: ${incomesData.data.length}`);
  console.log();

  await sleep(500);

  // 6. Resumo financeiro
  console.log('6️⃣  Obtendo resumo financeiro...');
  const summary = await fetch(`${API_URL}/api/transactions/summary`);
  const summaryData = await summary.json();
  console.log('   📊 Resumo:');
  console.log(`      💚 Receitas: R$ ${summaryData.data.totalIncome.toFixed(2)}`);
  console.log(`      ❤️  Despesas: R$ ${summaryData.data.totalExpense.toFixed(2)}`);
  console.log(`      💙 Saldo:    R$ ${summaryData.data.balance.toFixed(2)}`);
  console.log();

  await sleep(500);

  // 7. Atualizar transação
  console.log('7️⃣  Atualizando uma transação...');
  const updated = await fetch(`${API_URL}/api/transactions/${income1Data.data.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: 5500
    })
  });
  const updatedData = await updated.json();
  console.log('   ✅ Transação atualizada:', updatedData.data.description, '-', `R$ ${updatedData.data.amount}`);
  console.log();

  await sleep(500);

  // 8. Teste de validação
  console.log('8️⃣  Testando validação (deve falhar)...');
  const invalid = await fetch(`${API_URL}/api/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      description: 'ab', // Muito curto
      amount: -100, // Negativo
      type: 'invalid',
      category: 'X'
    })
  });
  const invalidData = await invalid.json();
  console.log('   ❌ Erro esperado:', invalidData.message);
  console.log();

  console.log('✨ Demonstração concluída com sucesso!\n');
  console.log('📚 Explore mais endpoints no README.md');
}

// Executar
demo().catch(console.error);
