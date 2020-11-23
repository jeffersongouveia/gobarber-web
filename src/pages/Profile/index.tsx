import React, { ChangeEvent, useCallback, useRef } from 'react'
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'

import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { AvatarInput, Container, Content } from './styles'

interface ProfileFormData {
  name: string
  email: string
  current_password: string
  new_password: string
  new_password_confirmation: string
}

interface ProfileUser {
  id: string
  name: string
  email: string
  avatar_url: string
  is_hairstyle: boolean
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { user, updateUser } = useAuth()
  const { addToast } = useToast()

  const handleAvatarSubmit = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files[0])

      const formData = new FormData()
      formData.append('avatar', e.target.files[0])

      api.patch('/users/avatar', formData)
        .then(({ data }) => {
          updateUser(data)

          addToast({
            type: 'success',
            title: 'Avatar updated',
          })
        })
        .catch(console.error)
    }
  }, [addToast, updateUser])

  const handleSubmit = useCallback(async (data: ProfileFormData) => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
          .required('Email is required')
          .email('Use a valid email'),
        old_password: Yup.string(),
        password: Yup.string()
          .when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().required('Password is required'),
            otherwise: Yup.string(),
          }),
        password_confirmation: Yup.string()
          .when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().required('Password confirmation is required'),
            otherwise: Yup.string(),
          })
          .oneOf([Yup.ref('password'), undefined], 'Password confirmation not match'),
      })

      await schema.validate(data, { abortEarly: false })

      const { current_password, new_password, new_password_confirmation } = data
      const passwordFields = data.current_password
        ? { current_password, new_password, new_password_confirmation }
        : {}

      const formData = {
        name: data.name,
        email: data.email,
        ...passwordFields,
      }
      const { data: profile } = await api.put<ProfileUser>('/profile', formData)
      updateUser(profile)

      addToast({
        type: 'success',
        title: 'Profile updated',
        description: 'You profile was updated successfully',
      })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)
        return
      }

      addToast({
        type: 'error',
        title: 'Failed to update',
        description: 'An error occurred while updating your profile, please try again later',
      })
    }
  }, [addToast, updateUser])

  return (
    <Container>
      <header>
        <div>
          <Link to="/">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />

            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarSubmit} />
            </label>
          </AvatarInput>

          <h1>My profile</h1>

          <Input name="name" icon={FiUser} placeholder="Name" />
          <Input name="email" icon={FiMail} placeholder="Email" />

          <Input
            name="old_password"
            icon={FiLock}
            type="password"
            placeholder="Current password"
            containerStyle={{ marginTop: 24 }}
          />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="New password"
          />

          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder="Password confirmation"
          />

          <Button type="submit">
            Save changes
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

export default Profile
