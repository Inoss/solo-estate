import { Resend } from 'resend'

// Initialize Resend client only when needed
function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    return null
  }
  return new Resend(process.env.RESEND_API_KEY)
}

interface RequestOfferEmailData {
  name: string
  email: string
  phone: string
  country?: string
  budget?: string
  preferredCity?: string
  propertyType?: string
  message?: string
  projectId?: string
  projectTitle?: string
  locale: string
}

interface ContactEmailData {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  locale: string
}

export async function sendRequestOfferEmail(data: RequestOfferEmailData) {
  const resend = getResendClient()
  if (!resend) {
    console.log('Resend client not available - skipping email')
    return null
  }

  const { name, email, phone, country, budget, preferredCity, propertyType, message, projectTitle, locale } = data

  const emailSubject = projectTitle
    ? `New Investment Request: ${projectTitle}`
    : 'New Investment Inquiry'

  const emailBody = `
    <h2>New Investment Request</h2>

    <h3>Contact Information:</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    ${country ? `<p><strong>Country:</strong> ${country}</p>` : ''}

    <h3>Investment Details:</h3>
    ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
    ${preferredCity ? `<p><strong>Preferred City:</strong> ${preferredCity}</p>` : ''}
    ${propertyType ? `<p><strong>Property Type:</strong> ${propertyType}</p>` : ''}
    ${projectTitle ? `<p><strong>Project of Interest:</strong> ${projectTitle}</p>` : ''}

    ${message ? `<h3>Message:</h3><p>${message}</p>` : ''}

    <hr />
    <p><small>Language: ${locale.toUpperCase()} | Submitted: ${new Date().toLocaleString()}</small></p>
  `

  try {
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'SOLO Estate <noreply@soloestate.com>',
      to: process.env.EMAIL_TO || 'info@soloestate.com',
      replyTo: email,
      subject: emailSubject,
      html: emailBody,
    })

    console.log('Request offer email sent:', result)
    return result
  } catch (error) {
    console.error('Error sending request offer email:', error)
    throw error
  }
}

export async function sendContactEmail(data: ContactEmailData) {
  const resend = getResendClient()
  if (!resend) {
    console.log('Resend client not available - skipping email')
    return null
  }

  const { name, email, phone, subject, message, locale } = data

  const emailSubject = subject || 'New Contact Form Submission'

  const emailBody = `
    <h2>New Contact Form Submission</h2>

    <h3>Contact Information:</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}

    <h3>Message:</h3>
    <p>${message}</p>

    <hr />
    <p><small>Language: ${locale.toUpperCase()} | Submitted: ${new Date().toLocaleString()}</small></p>
  `

  try {
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'SOLO Estate <noreply@soloestate.com>',
      to: process.env.EMAIL_TO || 'info@soloestate.com',
      replyTo: email,
      subject: emailSubject,
      html: emailBody,
    })

    console.log('Contact email sent:', result)
    return result
  } catch (error) {
    console.error('Error sending contact email:', error)
    throw error
  }
}

export async function sendAutoReplyEmail(to: string, name: string, locale: string = 'en') {
  const resend = getResendClient()
  if (!resend) {
    console.log('Resend client not available - skipping email')
    return null
  }

  const translations = {
    en: {
      subject: 'Thank you for your inquiry - SOLO Estate',
      body: `
        <h2>Thank you for your inquiry!</h2>
        <p>Dear ${name},</p>
        <p>We have received your inquiry and appreciate your interest in SOLO Estate's investment opportunities.</p>
        <p>Our team will review your request and get back to you within 24 hours.</p>
        <p>In the meantime, feel free to explore our website or contact us directly:</p>
        <ul>
          <li>Phone: +995 XXX XXX XXX</li>
          <li>Email: info@soloestate.com</li>
          <li>WhatsApp: +995 XXX XXX XXX</li>
        </ul>
        <p>Best regards,<br>SOLO Estate Team</p>
      `,
    },
    ru: {
      subject: 'Спасибо за ваш запрос - SOLO Estate',
      body: `
        <h2>Спасибо за ваш запрос!</h2>
        <p>Уважаемый(ая) ${name},</p>
        <p>Мы получили ваш запрос и ценим ваш интерес к инвестиционным возможностям SOLO Estate.</p>
        <p>Наша команда рассмотрит ваш запрос и свяжется с вами в течение 24 часов.</p>
        <p>Тем временем, не стесняйтесь изучать наш сайт или связаться с нами напрямую:</p>
        <ul>
          <li>Телефон: +995 XXX XXX XXX</li>
          <li>Email: info@soloestate.com</li>
          <li>WhatsApp: +995 XXX XXX XXX</li>
        </ul>
        <p>С уважением,<br>Команда SOLO Estate</p>
      `,
    },
  }

  const { subject, body } = translations[locale as keyof typeof translations] || translations.en

  try {
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'SOLO Estate <noreply@soloestate.com>',
      to: to,
      subject: subject,
      html: body,
    })

    console.log('Auto-reply email sent:', result)
    return result
  } catch (error) {
    console.error('Error sending auto-reply email:', error)
    throw error
  }
}
