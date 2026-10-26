import nodemailer from 'nodemailer'

const clean = (val) => String(val || '').replace(/[\r\n]/g, '').trim()

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody(event)
  
  // Проверка обязательных полей
  if (!body.name || !body.email || !body.message) {
    return { success: false, error: 'Заполните обязательные поля' }
  }
  
  if (!body.consent) {
    return { success: false, error: 'Необходимо согласие на обработку данных' }
  }
  
  // Настройка транспорта
  const transporter = nodemailer.createTransport({
    host: clean(config.smtpHost),
    port: Number(clean(config.smtpPort)),
    secure: true,
    auth: {
      user: clean(config.smtpUser),
      pass: clean(config.smtpPass)
    }
  })
  
  // Тема письма
  const subjectMap = {
    general: 'Общий вопрос',
    products: 'Продукция',
    services: 'Услуги',
    cooperation: 'Сотрудничество',
    other: 'Другое'
  }
  
  const subjectText = subjectMap[body.subject] || 'Заявка с сайта'
  
  // HTML письма
  const html = `
    <h2>Новая заявка с сайта</h2>
    <p><strong>Имя:</strong> ${body.name}</p>
    <p><strong>Email:</strong> ${body.email}</p>
    <p><strong>Телефон:</strong> ${body.phone || 'не указан'}</p>
    <p><strong>Тема:</strong> ${subjectText}</p>
    <hr>
    <p><strong>Сообщение:</strong></p>
    <p>${(body.message || '').replace(/\n/g, '<br>')}</p>
    <hr>
    <p style="color: #888; font-size: 12px;">
      Согласие на обработку персональных данных: ${body.consent ? 'Да' : 'Нет'}<br>
      Отправлено: ${new Date().toLocaleString('ru-RU')}
    </p>
  `
  
  try {
    await transporter.sendMail({
      from: `"Сайт ГосНИИХиманалит" <${clean(config.smtpUser)}>`,
      to: clean(config.mailTo),
      replyTo: body.email,
      subject: `Заявка с сайта: ${subjectText}`,
      html
    })
    return { success: true }
  } catch (error) {
    console.error('Ошибка отправки:', error)
    return { success: false, error: error.message }
  }
})