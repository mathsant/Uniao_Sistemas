import * as xlsx from 'xlsx'
import moment from 'moment'

const reportHeaders = ['Valor', 'Data do Serviço', 'Status do Serviço', 'Descrição do serviço']

const mapReportFields = (service) => [
  service.value,
  moment(service.date).format('L'),
  service.status,
  service.describe,
]

export default function (serviceList) {
  const wb = xlsx.utils.book_new()
  wb.Props = {
    Title: 'Relatorio de serviços',
    Author: 'União Sistemas',
  }

  const wsDataGeneral = [reportHeaders]

  serviceList.forEach((service) => wsDataGeneral.push(mapReportFields(service)))
  const sheetDataGeneral = xlsx.utils.aoa_to_sheet(wsDataGeneral)
  xlsx.utils.book_append_sheet(wb, sheetDataGeneral, 'Relatorio de Serviços')

  return xlsx.write(wb, {
    bookType: 'xlsx',
    type: 'buffer',
  })
}
