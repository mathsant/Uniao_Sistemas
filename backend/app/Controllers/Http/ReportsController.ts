import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Service from 'App/Models/Service'
import Mail from '@ioc:Adonis/Addons/Mail'
import generateReport from '../../services/create.report'
import moment from 'moment'

export default class ReportsController {
  public async customer({ request }: HttpContextContract) {
    let { idServico, email, nameCustomer } = request.body()
    const servicos = await Service.find(idServico)
    const servicoValue = servicos?.value
    const servicoData = servicos?.date
    const servicoDescribe = servicos?.describe

    Mail.send((message) => {
      message.to(email)
      message.from('centroautouniao@gmail.com')
      message.subject('Relátorio de serviço')
      message.htmlView('reportForCustomer', {
        servico: {
          value: servicoValue,
          date: moment(servicoData).format('DD/MM/YYYY'),
          describe: servicoDescribe,
        },
        nameCustomer,
      })
    })
  }

  public async manager({ request, response }: HttpContextContract) {
    let { dateTo, dateFrom } = request.body()
    const services = await Service.query()
      .whereBetween('date', [`${dateTo}`, `${dateFrom}`])
      .preload('car')

    const reportBuffer = await generateReport(services)
    response.send(reportBuffer)
  }
}
