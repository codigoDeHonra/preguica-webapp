export default (val) => {
    // console.log(val.toLocaleString('pt-BR'))
  return val.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' })
}
