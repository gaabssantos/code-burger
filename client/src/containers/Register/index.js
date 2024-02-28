import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import { BurgerLogo, Button } from '../../components'
import api from '../../services/api'
import {
  Title,
  Subtitle,
  Label,
  Input,
  InputCheckbox,
  Terms,
  TermsLink,
  SignUp,
  SignUpTitle,
  SignUpLink
} from './styles'
import paths from '../../constants/paths'

export const Register = () => {
  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),
    password: Yup.string()
      .min(6, 'A senha deve ter pelo menos 6 dígitos')
      .required('A senha é obrigatória'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'As senhas não coincidem')
      .required('Confirme a senha')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async clientData => {
    try {
      const { status } = await api.post(
        'users',
        {
          name: clientData.name,
          email: clientData.email,
          password: clientData.password,
          admin: false
        },
        { validateStatus: () => true }
      )

      if (status === 201 || status === 200) {
        toast.success('Registrado com sucesso')
      } else if (status === 409) {
        toast.error('Este e-mail já foi cadastrado')
      } else {
        throw new Error()
      }
    } catch (err) {
      toast.error('Deu algo de errado no sistema')
    }
  }

  return (
    <>
      <BurgerLogo>
        <Title>REGISTER</Title>
        <Subtitle>Crie sua conta hoje!</Subtitle>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label>
            Nome
            <Input
              style={errors.name && { border: '1px solid red' }}
              type="text"
              {...register('name')}
            />
            <p style={{ color: '#fc3f3f', marginTop: '3px' }}>
              {errors.name?.message}
            </p>
          </Label>
          <Label>
            E-mail
            <Input
              style={errors.email && { border: '1px solid red' }}
              type="email"
              {...register('email')}
            />
            <p style={{ color: '#fc3f3f', marginTop: '3px' }}>
              {errors.email?.message}
            </p>
          </Label>
          <Label>
            Senha
            <Input
              style={errors.password && { border: '1px solid red' }}
              type="password"
              {...register('password')}
            />
            <p style={{ color: '#fc3f3f', marginTop: '3px' }}>
              {errors.password?.message}
            </p>
          </Label>
          <Label>
            Confirmar senha
            <Input
              style={errors.confirmPassword && { border: '1px solid red' }}
              type="password"
              {...register('confirmPassword')}
            />
            <p style={{ color: '#fc3f3f', marginTop: '3px' }}>
              {errors.confirmPassword?.message}
            </p>
          </Label>
          <Button type="submit">Logar</Button>
        </form>
        <Terms>
          <Label>
            <InputCheckbox type="checkbox" required />
            Eu aceito os termos
          </Label>
          <TermsLink>Termos & Condições</TermsLink>
        </Terms>
        <SignUp>
          <SignUpTitle>Ja tem uma conta?</SignUpTitle>
          <Link to={paths.Login}>
            <SignUpLink>Logar</SignUpLink>
          </Link>
        </SignUp>
      </BurgerLogo>
    </>
  )
}
