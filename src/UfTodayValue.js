const moment = require('moment')
const fetch = require('node-fetch')

async function ufRequest(){
  const dateNow = moment().format('DD-MM-YYYY')
  try{
    const response = await fetch(`https://mindicador.cl/api/uf/${dateNow}`)
    const data = await response.json()
    return data.serie[0].valor

  }catch(err){
    console.error('the data request has an error', err)
  }
}

module.exports = ufRequest