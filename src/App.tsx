import { Input } from "./Components/input";
import { z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function validaNascimento(value: string){
  const data = new Date(value)
  const hoje = new Date()

    return !isNaN(data.getTime()) && data < hoje;
}


const schama = z.object({
  name: z.string().nonempty("O campo 'Nome' é obrigatório!"),
  email: z.string().email("Insira um email valido").nonempty("O campo 'Email' é obrigatório!"),
  senha: z.string().min(8, "A senha deve ser maior que 7 caracteres").nonempty("O campo 'Senha' é obrigatório!"),
  senhanovamente: z.string().nonempty("Confirme sua senha"),
  telefone: z.string().min(1, "O campo 'Telefone' é obrigatório!").refine((value) =>  /^(\d{10,11})$/.test(value),{
    message: "Número de telefone invalido!"
  }),
  nascimento: z.string().nonempty("O campo 'Data de nascimento' é obrigatório!").refine((value) => validaNascimento(value),{
      message: "Insira uma data de nascimento válida!"
  }),
  cpf: z.string().refine((value) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value), {
    message: "Insira um CPF válido!"
  })

  
}).refine((data) => data.senha === data.senhanovamente, {
  message: "As senhas não coincidem",
  path: ["senhanovamente"],
});

type FormData = z.infer<typeof schama>

export default function App(){

const {register, formState: {errors}} = useForm<FormData>({
  resolver: zodResolver(schama),
  mode: "onChange"
})



  return(
    <main className="flex m-auto w-full max-w-7xl">
      <section className="w-full flex flex-col items-center h-screen justify-center">
        <form className="w-full max-w-2xl p-5 bg-white rounded-md">

          <div>
            <p>Nome:</p>
            <Input
              type="text"
              name="nome"
              placeholder="Digite seu nome..."
              register={register}
              error={errors.name?.message}
            />
          </div>

          <div>
            <p>Email:</p>
            <Input
              type="email"
              name="email"
              placeholder="Digite seu email..."
              register={register}
              error={errors.email?.message}
            />
          </div>

          <div>
            <p>Senha:</p>
            <Input
              type="password"
              name="senha"
              placeholder="Digite sua senha..."
              register={register}
              error={errors.senha?.message}
            />
          </div>

          <div>
            <p>Insira a senha mais uma vez:</p>
            <Input
              type="password"
              name="senhanovamente"
              placeholder="Digite sua senha novamente..."
              register={register}
              error={errors.senhanovamente?.message}
            />
          </div>

          <div>
            <p>Telefone:</p>
            <Input
              type="text"
              name="telefone"
              placeholder="Digite seu telefone..."
              register={register}
              error={errors.telefone?.message}
            />
          </div>

          <div>
            <p>Nascimento:</p>
            <Input
              type="text"
              name="nascimento"
              placeholder="Digite sua data de nascimento"
              register={register}
              error={errors.nascimento?.message}
            />
          </div>

           <div>
            <p>CPF:</p>
            <Input
              type="text"
              name="cpf"
              placeholder="Digite seu CPF"
              register={register}
              error={errors.cpf?.message}
            />
          </div>


          <button className="w-full bg-[#12d473] px-2 h-8 rounded-md font-medium">Cadastrar</button>

        </form>
      </section>
    </main>
  )
}