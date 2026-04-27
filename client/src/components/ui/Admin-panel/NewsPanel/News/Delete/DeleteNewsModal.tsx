import { FC } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from '@mui/material';
import { NewsPanelUtilsModalProps } from '@components/ui/Admin-panel/NewsPanel/utils/types.ts';
import { useDeletePostMutation } from '@services/post.service.ts';
import { useSnackbar } from 'notistack';

export const DeleteNewsModal:FC<NewsPanelUtilsModalProps> = ({open, setOpen, news}) => {
  const [deleteNews]= useDeletePostMutation()

  const { enqueueSnackbar } = useSnackbar();
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteNews = async (): Promise<void> => {
    if(news) {
      try {
        await deleteNews(news.id as number).unwrap();
        setOpen(false);
        enqueueSnackbar(' Новость удалена. ', {
          autoHideDuration: 2000,
          variant: 'success',
          anchorOrigin: {vertical: 'top', horizontal: 'right'}
        });
      } catch {
        enqueueSnackbar(' Ошибка удаления. ', {
          autoHideDuration: 2000,
          variant: 'error',
          anchorOrigin: {vertical: 'top', horizontal: 'right'}
        });
      }
    }
  }

  return <>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Box sx={{lineHeight: '1em'}} >
          <Typography variant='h4'  sx={{wordBreak: 'break-word', fontWeight: 'bold'}}>{"Новость:"}</Typography>
          <Typography variant='description_large' color='primary' sx={{wordBreak: 'break-word'}}>{news?.title}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography variant='description' sx={{fontWeight: 'bold'}}> Вы действительно хотите удалить эту новость?</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={handleDeleteNews} autoFocus>
          Удалить
        </Button>
      </DialogActions>
    </Dialog></>
}