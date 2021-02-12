import jsPDF from 'jspdf'
import moment from 'moment/min/moment-with-locales'

import axiosInstance from '../helpers/request'

export const getProdutos = (query) => {
  return axiosInstance
    .get('/product', { params: { query } })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const getEquips = (query) => {
  return axiosInstance
    .get('/product/getEquipsByEntrance', {
      params: { query },
    })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const getItens = (query) => {
  return axiosInstance
    .get('/product/getAllNames', {
      params: { query },
    })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const getMarca = (query) => {
  return axiosInstance
    .get('/mark', { params: { query } })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const getFabricante = (peca) => {
  return axiosInstance
    .get('/manufacturer', {
      params: { query: peca },
    })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const getAllProductType = () => {
  return axiosInstance
    .get('/equipModel/getAllType')
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const newMarca = (values) => {
  return axiosInstance
    .post('/mark', values)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const newProductType = (values) => {
  return axiosInstance
    .post('/equipModel/addType', values)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const newFabricante = (values) => {
  return axiosInstance
    .post('/manufacturer', values)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const newProduto = (values) => {
  return axiosInstance
    .post('/product', values)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const updateProduto = (values) => {
  return axiosInstance
    .put('/product', values)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const getProdutoByEstoque = (query) => {
  return axiosInstance
    .get('/product/getProductByStockBase', {
      params: { query },
    })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const GetRelatVendas = (query) => {
  return axiosInstance
    .get('/product/getAllVendas', {
      params: { query },
    })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const getProductById = async (id) => {
  try { 
    const response = await axiosInstance.get('/product/getByIdProducts', { params: { id } })
    return response 
    } catch (error) {
    throw new Error(error)
  } 
}

function addWrappedText({
  text,
  textWidth,
  doc,
  fontSize = 10,
  fontType = 'normal',
  lineSpacing = 7,
  xPosition = 10,
  YPosition = 17,
  initialYPosition = 10,
  pageWrapInitialYPosition = 10,
  index = 0,
  rows = 1,
}) {
  if (!!text) {
    var textLines = doc.splitTextToSize(text, textWidth) // Split the text into lines
    var pageHeight = doc.internal.pageSize.height // Get page height, well use this for auto-paging
    doc.setFontType(fontType)
    doc.setFontSize(fontSize)
    var cursorY = initialYPosition + 7 * index

    textLines.forEach((lineText) => {
      if (cursorY > pageHeight) {
        // Auto-paging
        doc.addPage()
        cursorY = pageWrapInitialYPosition
      }
      doc
        .text(
          xPosition + textWidth / 2,
          cursorY +
            (rows - 1) +
            2.5 * (rows - doc.splitTextToSize(text, textWidth).length),
          lineText,
          'center'
        )
        .rect(xPosition, YPosition + 7 * index, textWidth, 7 + 7 * (rows - 1))
      cursorY += lineSpacing
    })
  } else {
    doc.rect(xPosition, YPosition + 7 * index, textWidth, 7 + 7 * (rows - 1))
  }
}

function title(doc) {
  addWrappedText({
    text: 'SKU', // Put a really long string here
    textWidth: 20,
    doc,
    fontSize: '12',
    fontType: 'normal',
    lineSpacing: 5, // Space between lines
    xPosition: 5, // Text offset from left of document
    YPosition: 10,
    initialYPosition: 15, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
  })

  addWrappedText({
    text: 'Produto', // Put a really long string here
    textWidth: 100,
    doc,
    fontSize: '12',
    fontType: 'normal',
    lineSpacing: 5, // Space between lines
    xPosition: 25, // Text offset from left of document
    YPosition: 10,
    initialYPosition: 15, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
  })

  addWrappedText({
    text: 'Marca', // Put a really long string here
    textWidth: 40,
    doc,
    fontSize: '12',
    fontType: 'normal',
    lineSpacing: 5, // Space between lines
    xPosition: 125, // Text offset from left of document
    YPosition: 10,
    initialYPosition: 15, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
  })

  addWrappedText({
    text: 'Corredor', // Put a really long string here
    textWidth: 30,
    doc,
    fontSize: '12',
    fontType: 'normal',
    lineSpacing: 5, // Space between lines
    xPosition: 165, // Text offset from left of document
    YPosition: 10,
    initialYPosition: 15, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
  })

  addWrappedText({
    text: 'coluna', // Put a really long string here
    textWidth: 30,
    doc,
    fontSize: '12',
    fontType: 'normal',
    lineSpacing: 5, // Space between lines
    xPosition: 195, // Text offset from left of document
    YPosition: 10,
    initialYPosition: 15, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
  })
  addWrappedText({
    text: 'prateleira', // Put a really long string here
    textWidth: 30,
    doc,
    fontSize: '12',
    fontType: 'normal',
    lineSpacing: 5, // Space between lines
    xPosition: 225, // Text offset from left of document
    YPosition: 10,
    initialYPosition: 15, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
  })
  addWrappedText({
    text: 'gaveta', // Put a really long string here
    textWidth: 30,
    doc,
    fontSize: '12',
    fontType: 'normal',
    lineSpacing: 5, // Space between lines
    xPosition: 255, // Text offset from left of document
    YPosition: 10,
    initialYPosition: 15, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
  })
}

export const CreatePDF = (products) => {
  var doc = new jsPDF({
    orientation: 'l',
    unit: 'mm',
    format: 'a4',
    hotfixes: [], // an array of hotfix strings to enable
  })

  doc.setFontSize(10).text(148.5, 205, `Página 1`, 'center')

  console.log(products)

  let index = 0
  let page = false
  products.map((product, idx) => {
    if (idx === 0) {
      title(doc)
    }

    const rows = Math.max.apply(null, [
      doc.splitTextToSize(product.sku, 20).length,
      doc.splitTextToSize(product.name, 100).length,
      doc.splitTextToSize(product.mark, 40).length,
    ])

    if (index + rows > 25) {
      index = 0

      doc.addPage()

      title(doc)
      page = page + 1
      doc.setFontSize(10).text(148.5, 205, `Página ${page + 1}`, 'center')
    }

    addWrappedText({
      text: product.sku.trim(), // Put a really long string here
      textWidth: 20,
      doc,
      fontSize: '12',
      fontType: 'normal',
      lineSpacing: 5, // Space between lines
      xPosition: 5, // Text offset from left of document
      initialYPosition: 22, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
      index,
      rows,
    })

    addWrappedText({
      text: product.name.trim(), // Put a really long string here
      textWidth: 100,
      doc,
      fontSize: '12',
      fontType: 'normal',
      lineSpacing: 5, // Space between lines
      xPosition: 25, // Text offset from left of document
      initialYPosition: 22, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
      index,
      rows,
    })

    addWrappedText({
      text: product.mark.trim(), // Put a really long string here
      textWidth: 40,
      doc,
      fontSize: '12',
      fontType: 'normal',
      lineSpacing: 5, // Space between lines
      xPosition: 125, // Text offset from left of document
      initialYPosition: 22, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
      index,
      rows,
    })

    addWrappedText({
      text: product.corredor.trim(), // Put a really long string here
      textWidth: 30,
      doc,
      fontSize: '12',
      fontType: 'normal',
      lineSpacing: 5, // Space between lines
      xPosition: 165, // Text offset from left of document
      initialYPosition: 22, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
      index,
      rows,
    })

    addWrappedText({
      text: product.coluna.trim(), // Put a really long string here
      textWidth: 30,
      doc,
      fontSize: '12',
      fontType: 'normal',
      lineSpacing: 5, // Space between lines
      xPosition: 195, // Text offset from left of document
      initialYPosition: 22, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
      index,
      rows,
    })
    addWrappedText({
      text: product.prateleira.trim(), // Put a really long string here
      textWidth: 30,
      doc,
      fontSize: '12',
      fontType: 'normal',
      lineSpacing: 5, // Space between lines
      xPosition: 225, // Text offset from left of document
      initialYPosition: 22, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
      index,
      rows,
    })
    addWrappedText({
      text: product.gaveta.trim(), // Put a really long string here
      textWidth: 30,
      doc,
      fontSize: '12',
      fontType: 'normal',
      lineSpacing: 5, // Space between lines
      xPosition: 255, // Text offset from left of document
      initialYPosition: 22, // Initial offset from top of document; set based on prior objects in document
      pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
      index,
      rows,
    })

    index = index + rows

    // eslint-disable-next-line array-callback-return
    return
  })

  moment.locale('pt')

  doc.autoPrint()

  doc.save(`PRODUTOS_${moment().format('L')}.pdf`)
}
