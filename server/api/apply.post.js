import nodemailer from 'nodemailer'

const clean = (val) => String(val || '').replace(/[\r\n]/g, '').trim()

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody(event)
  
  if (!body.name || !body.email || !body.phone) {
    return { success: false, error: 'Заполните все поля' }
  }
  
  const transporter = nodemailer.createTransport({
    host: clean(config.smtpHost),
    port: Number(clean(config.smtpPort)),
    secure: true,
    auth: {
      user: clean(config.smtpUser),
      pass: clean(config.smtpPass)
    }
  })
  
  const html = `
    <h2>Отклик на вакансию</h2>
    <p><strong>Вакансия:</strong> ${body.vacancy}</p>
    <hr>
    <p><strong>ФИО:</strong> ${body.name}</p>
    <p><strong>Email:</strong> ${body.email}</p>
    <p><strong>Телефон:</strong> ${body.phone}</p>
  `
  
  try {
    await transporter.sendMail({
      from: `"Сайт ГосНИИХиманалит" <${clean(config.smtpUser)}>`,
      to: clean(config.mailTo),
      replyTo: body.email,
      subject: `Отклик на вакансию: ${body.vacancy}`,
      html
    })
    return { success: true }
  } catch (error) {
    console.error('Ошибка отправки:', error)
    return { success: false, error: error.message }
  }
})