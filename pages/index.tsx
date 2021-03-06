import type { NextPage } from "next"
import type { FormEvent } from "react"
import { EmailFormData, EmailLog, EmailStatus, MessageType } from "../types"

import Head from "next/head"
import { useEffect, useState } from "react"

const Home: NextPage = () => {
  useEffect(() => {
    document.title = "Home | YS Mails"
  }, [])

  const [isSending, setIsSending] = useState(false)
  const [logs, setLogs] = useState<EmailLog[]>([] as EmailLog[])
  const [form, setForm] = useState<EmailFormData>({ messageType: MessageType.HTML } as EmailFormData)

  const testRecipientsHandler = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const testRecepients = "Neesh\tavaneeshsamsi@gmail.com\nKavita\tkavitasamsi@gmail.com"

    setForm((prevForm) => {
      return { ...prevForm, recepients: testRecepients }
    })
  }

  const validateRecepientsHandler = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    alert("TODO")
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto pt-24">
        <h2 className="text-3xl font-semibold mb-12">Bulk Emails Form</h2>

        <form className="mb-12">
          <div className="flex flex-col gap-2 mb-6">
            <label htmlFor="subject" className="font-bold text-lg">
              Subject:
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Enter subject here"
              value={form.subject}
              onChange={(e) => {
                setForm((prevForm) => {
                  return { ...prevForm, subject: e.target.value }
                })
              }}
            />
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <label htmlFor="message" className="font-bold text-lg">
              Message:
            </label>
            <textarea
              id="message"
              cols={30}
              rows={6}
              placeholder={
                form.messageType === MessageType.HTML ? "Paste your HTML message here" : "Enter your message here"
              }
              className={form.messageType === MessageType.HTML ? "font-mono" : "font-sans"}
              value={form.message}
              onChange={(e) => {
                setForm((prevForm) => {
                  return { ...prevForm, message: e.target.value }
                })
              }}
            ></textarea>

            <div className="flex gap-4">
              <button
                name="html"
                className={`
                px-2 py-1
                ${
                  form.messageType === MessageType.HTML
                    ? "bg-black text-white border border-white"
                    : "bg-white text-black border border-black"
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  setForm((prevForm) => {
                    return { ...prevForm, messageType: MessageType.HTML }
                  })
                }}
              >
                HTML
              </button>
              <button
                name="text"
                className={`
                px-2 py-1
                ${
                  form.messageType === MessageType.TEXT
                    ? "bg-black text-white border border-white"
                    : "bg-white text-black border border-black"
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  setForm((prevForm) => {
                    return { ...prevForm, messageType: MessageType.TEXT }
                  })
                }}
              >
                Text
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <label htmlFor="recepeints" className="font-bold text-lg">
              Recepients
            </label>
            <textarea
              id="recepients"
              cols={30}
              rows={12}
              placeholder="Paste Google Sheets recepients here"
              value={form.recepients}
              onChange={(e) => {
                setForm((prevForm) => {
                  return { ...prevForm, recepients: e.target.value }
                })
              }}
            ></textarea>
          </div>

          <div className="flex gap-4 mb-12">
            <button
              className="border border-black px-2 py-1 hover:bg-black hover:text-white hover:border-white"
              onClick={(e) => {
                testRecipientsHandler(e)
              }}
            >
              Use Test Recepients
            </button>
            <button
              className="border border-black px-2 py-1 hover:bg-black hover:text-white hover:border-white"
              onClick={validateRecepientsHandler}
            >
              Validate Recepients
            </button>
          </div>

          <button
            className="px-4 py-2 text-lg font-medium border border-black hover:bg-black hover:text-white hover:border-white"
            // onClick={sendEmailsHandler}
            disabled={isSending}
          >
            Send Emails
          </button>
        </form>

        <h4 className="font-bold text-lg mb-6">Email Logs</h4>
        <div className="flex flex-col gap-2 mb-16">
          {logs.length > 0 ? (
            logs.map((log, index) => {
              const statusColor = log.status === EmailStatus.SUCCESS ? "text-green-600" : "text-red-600"

              return (
                <div className="grid grid-cols-3 justify-between border border-black py-1 px-4 font-medium" key={index}>
                  <p>{log.firstName}</p>
                  <p className="text-center">{log.email}</p>
                  <p className={`${statusColor} font-bold text-right`}>{log.status}</p>
                </div>
              )
            })
          ) : (
            <p>No logs yet</p>
          )}
        </div>
      </main>
    </>
  )
}

export default Home
