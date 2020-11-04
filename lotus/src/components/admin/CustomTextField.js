import * as React from 'react';
import {useField} from 'formik';
import TextField, {TextFieldProps} from '@material-ui/core/TextField';
// import {InputAdornment} from '@material-ui/core';
// import {ErrorIcon} from '../assets/icons/errorIcon';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(  ({
  TextField: {
    width: '100%',
  },
}));


export function CustomTextField({name, InputProps, ...props}) {
  const [field, meta] = useField(name);
  const classes = useStyles();

  return (
    <TextField
      {...field}
      variant="outlined"
      helperText={meta.touched && meta.error ? meta.error : null}
      className={classes.TextField}
      InputProps={{
        // classes: {input: classes.resize},
        ...InputProps,
        // endAdornment: (
        //   <>
        //     {meta.error && meta.touched && (
        //       <InputAdornment position="end" component="span">
        //         {/* <ErrorIcon fill="#C60C30" /> */}
        //       </InputAdornment>
        //     )}

        //     {InputProps?.endAdornment}
        //   </>
        // ),
      }}
      {...props}
    />
  );
}
