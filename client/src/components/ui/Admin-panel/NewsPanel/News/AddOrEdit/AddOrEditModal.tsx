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
  const [ addPost, { isLoading: isAdding } ] = useAddPostMutation();
  const [ updatePost, { isLoading: isUpdating } ] = useUpdatePostMutation();
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState<File | null>(null);
  const isSubmitting = isAdding || isUpdating;
  const handleClose = () => {
    setOpen(false);
    setFile(null)
  };

  const handleChangeFile = (
    nextFile: File | null,
    setFieldValue: (field: string, value: unknown) => void
  ) => {
    setFile(nextFile);
    setFieldValue('image', nextFile)
  };

  const getHouseLabel = (housesId: Post['housesId'] | undefined): string => {
    if (Array.isArray(housesId) && housesId.length > 1) {
      return 'Дома';
    }
    return 'Дом';
  };

  const getDefaultValue = () => {
      return data?.filter((el) => news?.housesId?.includes(el.id as string)).map((el) => getShortAddress(el.full_address))
  }

  const validate = (values: Partial<Post>) => {
    const errors: Partial<Record<keyof Post, string>> = {};
    if (!values.title || !values.title.trim()) {
      errors.title = 'Введите заголовок';
    }
    return errors;
  };

  const onSubmit = async (values: Partial<Post>) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, Array.isArray(value) ?  value.join(',') : value as string);
    });
    try {
      if(news?.id) {
        formData.append('id', news.id as string);
        await updatePost(formData).unwrap();
        enqueueSnackbar('Новость отредактирована.', {
          autoHideDuration: 2000,
          variant: 'success',
          anchorOrigin: {vertical: 'top', horizontal: 'right'},
        });
      } else {
        await addPost(formData).unwrap();
        enqueueSnackbar('Новость добавлена.', {
          autoHideDuration: 2000,
          variant: 'success',
          anchorOrigin: {vertical: 'top', horizontal: 'right'},
        });
      }
      handleClose();
    } catch {
      enqueueSnackbar(news?.id ? 'Ошибка редактирования.' : 'Ошибка добавления.', {
        autoHideDuration: 2000,
        variant: 'error',
        anchorOrigin: {vertical: 'top', horizontal: 'right'},
      });
    }
  };

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
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, handleChange, setFieldValue }) => (
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
              error={Boolean(touched.title && errors.title)}
              helperText={touched.title && errors.title ? errors.title : ''}
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
                  label={getHouseLabel(values?.housesId)}
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
              <Button onClick={handleClose} disabled={isSubmitting}>Отменить</Button>
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Сохранение...' : 'Сохранить'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </DialogContent>
  </>
  }
  </Dialog>;
};