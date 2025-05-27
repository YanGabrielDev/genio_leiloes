import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"
import { Loader2 } from "lucide-react"

interface SignFormProps {
    openSignUpForm: () => void
    isLoadingSubmit: boolean
}
export const SignForm = ({ openSignUpForm, isLoadingSubmit }: SignFormProps) => {
    const form = useFormContext()
    return (
        <div className="w-full flex gap-4 flex-col min-w-80">
            <h1 className="font-bold text-blue-600 text-5xl">Login</h1>
            <h2 className="text-blue-600 text-base opacity-70 font-medium">Acesse sua conta para ter mais funcionalidades.</h2>
            <FormField
                control={form.control}
                name="email"
                rules={{ required: "Campo obrigatório!" }}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input placeholder="E-mail" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                rules={{ required: "Campo obrigatório!" }}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input placeholder="Senha" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <h2 className="text-blue-800 text-base opacity-50 font-normal">Esqueceu sua senha?</h2>
            <Button disabled={isLoadingSubmit} variant={"primary"} type="submit">
                {isLoadingSubmit && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <span className="font-normal ">Login</span>
            </Button>
            <div className="flex w-full justify-between items-center absolute bottom-10 max-w-80">
                <span className="text-blue-800 text-base opacity-50 font-normal">Não possui conta?</span>
                <Button
                    variant="outline"
                    onClick={openSignUpForm}
                >
                    <span className="font-normal">Criar conta</span>
                </Button>
            </div>
        </div>
    )
}