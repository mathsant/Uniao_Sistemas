import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Service from 'App/Models/Service'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class ReportsController {
  public async customer({ request }: HttpContextContract) {
    let { idServico, email, nameCustomer } = request.body()
    const servicos = await Service.find(idServico)
    const servicoValue = servicos?.value
    const servicoData = servicos?.date
    const servicoDescribe = servicos?.describe

    Mail.send((message) => {
      message.to(email)
      message.from(email)
      message.subject('Relátorio de serviço')
      message.htmlView('reportForCustomer', {
        servico: {
          value: servicoValue,
          date: servicoData,
          describe: servicoDescribe,
        },
        nameCustomer,
      })
    })
  }

  public async manager({ request, response }: HttpContextContract) {
    let { email, dateTo, dateFrom } = request.body()
    try {
      const services = await Service.query()
        .whereBetween('date', [`${dateTo}`, `${dateFrom}`])
        .preload('collaborator')
        .preload('car')
      Mail.send((message) => {
        message.to(email)
        message.from('uniaosistemas@gmail.com')
        message.subject('Relatorio de serviços')
        message.htmlView('services', { services })
      })
    } catch (error) {
      response.status(400).send('Error!')
    }
  }
}
