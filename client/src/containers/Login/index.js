import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import { BurgerLogo, Button } from '../../components/'
import paths from '../../constants/paths'
import { useUser } from '../../hooks/UserContext'
import api from '../../services/api'
import {
  Title,
  Subtitle,
  Label,
  Input,
  InputCheckbox,
  SignUp,
  SignUpTitle
} from './styles'

export const Login = () => {
  const history = useHistory()
  const { putUserData } = useUser()

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),
    password: Yup.string()
      .min(6, 'A senha deve ter pelo menos 6 dígitos')
      .required('A senha é obrigatória')
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
      const { status, data } = await api.post(
        'sessions',
        {
          email: clientData.email,
          password: clientData.password
        },
        { validateStatus: () => true }
      )

      putUserData(data)

      if (status === 200 || status === 201) {
        toast.success('Logado com sucesso')
        setTimeout(() => {
          if (data.admin) {
            history.push(paths.Order)
          } else {
            history.push(paths.Home)
          }
        }, 1000)
      } else if (status === 401) {
        toast.error('O e-mail ou a senha estão incorretos')
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
        <Title>LOGIN</Title>
        <Subtitle>Bem-vindo de volta!</Subtitle>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
          <Button type="submit">Logar</Button>
        </form>
        <Label>
          <InputCheckbox type="checkbox" />
          Lembrar de mim
        </Label>
        <SignUp>
          <SignUpTitle>Não tem uma conta?</SignUpTitle>
          <Link to={paths.Register}>Registrar</Link>
        </SignUp>
      </BurgerLogo>
    </>
  )
}
