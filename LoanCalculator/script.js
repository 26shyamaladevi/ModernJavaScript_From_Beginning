//Listen for submit
document.getElementById('loan-form').addEventListener('submit',function(e){
    //Hide results
    document.getElementById('results').style.display = 'none';
    //show loader
    document.getElementById('loading').style.display = 'block';
    //Timeout
    setTimeout(calculateResults, 7200)

    e.preventDefault();
})

//calculateResults()
function calculateResults()
{
    //UT var
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calsulatedInterest = parseFloat(interest.value)/100/12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //Calculate monthly payment
    const x = Math.pow(1 + calsulatedInterest, calculatedPayments);
    const monthly = (principal*x*calsulatedInterest)/(x-1);

    //To check if its finite
    if(isFinite(monthly))
    {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2)

        //show results
        document.getElementById('results').style.display = 'block';
        //Hide loader
        document.getElementById('loading').style.display = 'none';

        
    }
    else{
        // console.log('Please check your number that you have entered!')
        showError('Please check your number that you have entered!')
    }


    
}

//showError()
function showError(error)
{
    //Hide results
    document.getElementById('results').style.display = 'none';
    //Hide loader
    document.getElementById('loading').style.display = 'none';

    const errorDiv = document.createElement('div');
    const card = document.querySelector('.card')
    const heading = document.querySelector('.heading')

    //Add Bootstrap Class 
    errorDiv.className = 'alert alert-danger'

    errorDiv.appendChild(document.createTextNode(error))

    //Insert Error Above Heading Loan Calculator
    card.insertBefore(errorDiv, heading)

    //Error Timeout After 3 sec
    setTimeout(clearError, 3000)

}


//clearError
function clearError(){
    document.querySelector('.alert').remove()
}
