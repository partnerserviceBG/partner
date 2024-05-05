import { FC, useState } from 'react';
import {
  Autocomplete, Box,
  Button, CircularProgress,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Typography,
} from '@mui/material';
import { NewsPanelUtilsModalProps } from '@components/ui/Admin-panel/NewsPanel/utils/types.ts';
import { useSnackbar } from 'notistack';
import { useGetHousesQuery } from '@services/house.service.ts';
import { Form, Formik } from 'formik';
import TextField from '@mui/material/TextField';
import { getShortAddress } from '@utils/utils.ts';
import { MuiFileInput } from 'mui-file-input';
import CloseIcon from '@mui/icons-material/Close';
import { useAddPostMutation, useUpdatePostMutation } from '@services/post.service.ts';
import { Post } from '@models/Post.ts';

const newPost: Partial<Post> = {
  title: '',
  content: '',
  housesId: undefined,
  image: undefined
};

export const AddOrEditModal: FC<NewsPanelUtilsModalProps> = ({ open, setOpen, news }) => {

  const { data, isLoading } = useGetHousesQuery();
  const [ addPost ] = useAddPostMutation();
  const [ updatePost ] = useUpdatePostMutation();
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState<File | null>(null);
  const handleClose = () => {
    setOpen(false);
    setFile(null)
  };

  const handleChangeFile = (file: File | null, setFieldValue: Function) => {
    setFile(file);
    setFieldValue('image', file)
  };

  const getDefaultValue = () => {
      return data?.filter((el) => news?.housesId?.includes(el.id as string)).map((el) => getShortAddress(el.full_address))
  }

  const onSubmit = (values: Partial<Post>) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, Array.isArray(value) ?  value.join(',') : value as string)
    })
    if(news?.id) {
      formData.append('id', news.id as string)
      updatePost(formData).then((data) => {
        enqueueSnackbar(` ${data ? "Новость отредактирована." : 'Ошибка редактирования.' } `, { autoHideDuration: 2000, variant: data ? 'success' : 'error', anchorOrigin: {vertical: 'top', horizontal: 'right'}});
      })

    } else {
      addPost(formData).then((data) => {
        enqueueSnackbar(` ${data ? "Новость Добавлена." : 'Ошибка добавления.' } `, { autoHideDuration: 2000, variant: data ? 'success' : 'error', anchorOrigin: {vertical: 'top', horizontal: 'right'}});
      })

    }
    handleClose()
  }

  return <Dialog
    open={open}
    onClose={handleClose}
    fullWidth
  > {isLoading ? <Box display='flex' justifyContent='center' sx={{p: 10}}><CircularProgress size={50}  color='primary'/></Box> : <>
    <DialogTitle>{news ? 'Редактировать объявление' : 'Создать объявление'}</DialogTitle>
    <DialogContent>
      <DialogContentText component={Typography} variant='h4' color='primary'>
        Поля отмеченые * обязательны к заполнению.
      </DialogContentText>
      <Formik
        initialValues={news ? news : newPost}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <TextField
              variant='outlined'
              id='title'
              name='title'
              label='Заголовок'
              value={values.title}
              onChange={handleChange}
              fullWidth
              required
              minRows={1}
              maxRows={3}
              multiline
              sx={{ mt: 2 }}
            />
            <TextField
              variant='outlined'
              id='content'
              name='content'
              label='Содержание'
              value={values.content}
              onChange={handleChange}
              fullWidth
              minRows={1}
              maxRows={20}
              multiline
              sx={{ mt: 2 }}
            />
            <Autocomplete
              multiple
              loading={isLoading}
              id='housesId'
              sx={{ mt: 2 }}
              onChange={(_, value) => {
                const housesId = data?.filter((el) => value.includes(getShortAddress(el.full_address))).map((el) => el.id);
                setFieldValue('housesId', housesId);
              }}
              defaultValue={getDefaultValue()}
              options={data?.map(el => getShortAddress(el.full_address)) || []}
              getOptionLabel={(option) => option as string || ''}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  // @ts-ignore
                  label={values?.housesId?.length > 1 ? 'Дома' : 'Дом'}
                  placeholder='Выберите дом(а)'
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {isLoading ? <CircularProgress size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
            <MuiFileInput sx={{ mt: 2 }}
                          color='primary'
                          size='small'
                          variant='outlined'
                          label='Загрузить изображение'
                          value={file}
                          onChange={(file) => {
                            handleChangeFile(file, setFieldValue);
                          }}
                          InputProps={{
                            inputProps: {
                              accept: 'image/*',
                            },
                          }}
                          clearIconButtonProps={{
                            title: "Удалить",
                            children: <CloseIcon fontSize="small" />
                          }}
            />
            <DialogActions>
              <Button onClick={handleClose}>Отменить</Button>
              <Button type='submit'>Сохранить</Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </DialogContent>
  </>
  }
  </Dialog>;
};