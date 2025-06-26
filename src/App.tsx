import { Input } from "./Components/input";
import { z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


const schama = z.object({
  nome: z.string().nonempty("O campo 'Nome' é obrigatório!"),
  email: z.string().email("Insira um email valido").nonempty("O campo 'Email' é obrigatório!"),
  senha: z.string().min(8, "A senha deve ser maior que 7 caracteres").nonempty("O campo 'Senha' é obrigatório!"),
  senhanovamente: z.string().nonempty("Confirme sua senha"),
  telefone: z.string().min(1, "O campo 'Telefone' é obrigatório!").refine((value) =>  /^\d{7}-\d{4}$/.test(value),{
    message: "Número de telefone invalido!"
  }),
  nascimento: z.string().nonempty("O campo 'Data de nascimento' é obrigatório!")
  
}).refine((data) => data.senha === data.senhanovamente, {
  message: "As senhas não coincidem",
  path: ["senhanovamente"],
});

type FormData = z.infer<typeof schama>

export default function App(){

const {register, formState: {errors}, handleSubmit} = useForm<FormData>({
  resolver: zodResolver(schama),
  mode: "onChange"
})

function onsubmit(data: FormData){
  alert("Cadastrado")
  console.log(data)

}



  return(
    <main className="flex m-auto w-full max-w-7xl">
      <section className="w-full flex flex-col items-center px-3 justify-center h-screen">
        <form className="w-full max-w-2xl p-5 bg-white rounded-md " onSubmit={handleSubmit(onsubmit)}>

          <div>
            <p>Nome:</p>
            <Input
              type="text"
              name="nome"
              placeholder="Digite seu nome..."
              register={register}
              error={errors.nome?.message}
            />
          </div>

          <div className="mt-3">
            <p>Email:</p>
            <Input
              type="email"
              name="email"
              placeholder="Digite seu email..."
              register={register}
              error={errors.email?.message}
            />
          </div>

          <div className="mt-3">
            <p>Senha:</p>
            <Input
              type="password"
              name="senha"
              placeholder="Digite sua senha..."
              register={register}
              error={errors.senha?.message}
            />
          </div>

          <div className="mt-3">
            <p>Insira a senha mais uma vez:</p>
            <Input
              type="password"
              name="senhanovamente"
              placeholder="Digite sua senha novamente..."
              register={register}
              error={errors.senhanovamente?.message}
            />
          </div>

          <div className="mt-3">
            <p>Telefone:</p>
            <Input
              type="text"
              name="telefone"
              placeholder="Ex: xxxxxxx-xxxx"
              register={register}
              error={errors.telefone?.message}
            />
          </div>

          <div className="mt-3">
            <p>Nascimento:</p>
            <Input
              type="date"
              name="nascimento"
              register={register}
              error={errors.nascimento?.message}
            />
          </div>

          <button className="w-full bg-[#12d473] px-2 h-8 rounded-md font-medium mt-3 cursor-pointer">Cadastrar</button>

        </form>
      </section>
    </main>
  )
}