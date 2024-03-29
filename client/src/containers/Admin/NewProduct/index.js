import { yupResolver } from '@hookform/resolvers/yup'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import ReactSelect from 'react-select'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import paths from '../../../constants/paths'
import api from '../../../services/api'
import {
  Container,
  Label,
  Input,
  ButtonStyles,
  LabelUpload,
  FormController
} from './styles'

const NewProduct = () => {
  const [fileName, setFileName] = useState('')

  const { push } = useHistory()

  const scheme = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    price: Yup.string().required('O preço é obrigatório'),
    category: Yup.object().required('A categoria é obrigatória'),
    file: Yup.mixed()
      .test('required', 'A imagem é obrigatória', value => {
        return value?.length > 0
      })
      .test('fileSize', 'Carregue arquivos de até 2mb', value => {
        return value[0]?.size <= 2000000
      })
      .test('type', 'Carregue apenas arquivos PNG e JPEG.', value => {
        return value[0]?.type === 'image/png' || value[0]?.type === 'image/jpeg'
      })
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(scheme)
  })

  const [categories, setCategories] = useState([])

  const onSubmit = async data => {
    const productDataFormData = new FormData()

    productDataFormData.append('name', data.name)
    productDataFormData.append('price', data.price)
    productDataFormData.append('category_id', data.category.id)
    productDataFormData.append('file', data.file[0])

    try {
      await api.post('products', productDataFormData)
      toast.success('Produto foi gravado com sucesso.')

      setTimeout(() => {
        push(paths.ProductsAdmin)
      }, 2000)
    } catch (err) {
      toast.error('Deu algo de errado no sistema.')
    }
  }

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await api.get('categories')

      setCategories(data)
    }

    fetchCategories()
  }, [])

  return (
    <Container>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormController>
          <Label>Nome</Label>
          <Input type="text" {...register('name')} />
          <p style={{ color: 'red', marginTop: '5px' }}>
            {errors.name?.message}
          </p>
        </FormController>

        <FormController>
          <Label>Preço</Label>
          <Input type="number" {...register('price')} />
          <p style={{ color: 'red', marginTop: '5px' }}>
            {errors.price?.message}
          </p>
        </FormController>

        <FormController>
          <LabelUpload>
            {fileName || (
              <>
                <CloudUploadIcon style={{ marginRight: '10px' }} />
                Carregue a imagem do produto
              </>
            )}
            <input
              type="file"
              accept="image/png, image/jpeg"
              {...register('file')}
              onChange={value => {
                setFileName(value.target.files[0]?.name)
              }}
            />
          </LabelUpload>
          <p style={{ color: 'red', marginTop: '5px' }}>
            {errors.file?.message}
          </p>
        </FormController>

        <Controller
          name="category"
          control={control}
          render={({ field }) => {
            return (
              <ReactSelect
                {...field}
                options={categories}
                getOptionLabel={cat => cat.name}
                getOptionValue={cat => cat.id}
                placeholder="Categorias"
              />
            )
          }}
        ></Controller>
        <p style={{ color: 'red', marginTop: '5px' }}>
          {errors.category?.message}
        </p>

        <ButtonStyles>Adicionar produto</ButtonStyles>
      </form>
    </Container>
  )
}

export default NewProduct
