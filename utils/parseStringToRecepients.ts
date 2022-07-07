import { Recepient } from "../types"

const parseStringToRecepients = (data: string): Recepient[] => {
  const result = data.split("\n").map((contact) => {
    const [fullName, email] = contact.split("\t")
    const firstName = fullName.split(" ")[0]
    const lastName = fullName.split(" ").shift()

    return { firstName, lastName, email }
  })

  return result
}

export default parseStringToRecepients
