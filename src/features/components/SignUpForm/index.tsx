import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { Loader2 } from "lucide-react"

interface SignUpFormProps {
    closeSignUpForm: () => void;
    isLoadingSubmit: boolean;
}

export const SignUpForm = ({ closeSignUpForm, isLoadingSubmit }: SignUpFormProps) => {
    const form = useFormContext();
    const formFields = ['name', 'email', 'password', 'confirm_password']
    const placeholdersFields: Record<string, string> = {
        name: 'Nome',
        email: 'E-mail',
        password: 'Senha',
        confirm_password: 'Confirmação de senha'
    }

    return (
        <div className={`w-full flex gap-4 flex-col min-w-80`}>
            <h1 className="font-bold text-primary text-5xl">Registrar</h1>
            <h2 className="text-primary text-base opacity-70 font-medium">Registre sua conta</h2>

            {formFields.map(fieldName => (
                <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName}
                    rules={{ required: "Campo obrigatório!" }}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder={placeholdersFields[fieldName]}
                                    type={fieldName.includes('password') ? 'password' : 'text'}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            ))}

            <Button disabled={isLoadingSubmit} type="submit" variant="primary">
                {isLoadingSubmit && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <span className="font-normal">Registrar</span>
            </Button>

            <div className={`flex w-full justify-between items-center absolute bottom-10 max-w-80`}>
                <span className="text-primary text-base opacity-70 font-normal">Já possui conta?</span>
                <Button variant="outline" onClick={closeSignUpForm} >
                    <span className="font-normal">Faça login</span>
                </Button>
            </div>
        </div>
    );
};