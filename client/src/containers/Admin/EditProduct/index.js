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
  FormController,
  ContainerInput
} from './styles'

const EditProduct = () => {
  const [fileName, setFileName] = useState('')

  const {
    push,
    location: {
      state: { product }
    }
  } = useHistory()

  const scheme = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    price: Yup.string().required('O preço é obrigatório'),
    category: Yup.object().required('A categoria é obrigatória'),
    offer: Yup.bool()
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
    productDataFormData.append('offer', data.offer)

    try {
      await api.put(`products/${product.id}`, productDataFormData)
      toast.success('Produto foi editado com sucesso.')

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
          <Input
            type="text"
            {...register('name')}
            defaultValue={product.name}
          />
          <p style={{ color: 'red', marginTop: '5px' }}>
            {errors.name?.message}
          </p>
        </FormController>

        <FormController>
          <Label>Preço</Label>
          <Input
            type="number"
            {...register('price')}
            defaultValue={product.price}
          />
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
          defaultValue={product.category}
          render={({ field }) => {
            return (
              <ReactSelect
                {...field}
                options={categories}
                getOptionLabel={cat => cat.name}
                getOptionValue={cat => cat.id}
                placeholder="Categorias"
                defaultValue={product.category}
              />
            )
          }}
        ></Controller>
        <p style={{ color: 'red', marginTop: '5px' }}>
          {errors.category?.message}
        </p>

        <ContainerInput>
          <Label>Produto em oferta?</Label>
          <input
            type="checkbox"
            {...register('offer')}
            defaultChecked={product.offer}
          />
        </ContainerInput>
        <ButtonStyles>Editar produto</ButtonStyles>
      </form>
    </Container>
  )
}

export default EditProduct
