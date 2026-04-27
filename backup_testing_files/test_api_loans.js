// Test script to check actual API response from production
// Node.js 22 has built-in fetch

const BASE_URL = 'https://smart-api-library.vercel.app';

async function testLoansEndpoint() {
  try {
    console.log('Testing GET /api/loans endpoint...\n');
    
    const response = await fetch(`${BASE_URL}/api/loans`);
    const data = await response.json();
    
    console.log('Response Status:', response.status);
    console.log('Response Headers:');
    console.log('  Content-Type:', response.headers.get('content-type'));
    console.log('  Content-Length:', response.headers.get('content-length'));
    console.log('\nTotal loans returned:', data.length);
    console.log('\nFull response:');
    console.log(JSON.stringify(data, null, 2));
    
    // Count by status
    const borrowed = data.filter(loan => loan.status === 'BORROWED').length;
    const returned = data.filter(loan => loan.status === 'RETURNED').length;
    
    console.log('\n--- Summary ---');
    console.log('Total loans:', data.length);
    console.log('BORROWED:', borrowed);
    console.log('RETURNED:', returned);
    
    // Show BORROWED loans
    console.log('\n--- BORROWED Loans ---');
    data.filter(loan => loan.status === 'BORROWED').forEach(loan => {
      console.log(`ID: ${loan.id}`);
      console.log(`  Book: ${loan.book_title || 'Unknown'}`);
      console.log(`  Member: ${loan.member_name || 'Unknown'}`);
      console.log(`  Loan Date: ${loan.loan_date}`);
      console.log(`  Due Date: ${loan.due_date}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('Error testing API:', error.message);
  }
}

testLoansEndpoint();
