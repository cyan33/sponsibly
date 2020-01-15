import { css } from 'glamor'
import {
  green100, green500
} from 'material-ui/styles/colors';

// layout reset
css.global('*', { padding: '0', margin: '0' })
css.global('html, body, #root, ul', { 
  width: '100%',
  height: '100%',
})
css.global('ul', { listStyle: 'none' })
css.global('html', { 
  fontSize: '18',
  fontWeight: '300',
  fontFamily: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
  Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`
})
css.global('a', { 
  color: 'inherit',
  textDecoration: 'none'
})
css.global('button:focus', { outline: 'none !important' })
css.global('.MuiInput-underline:after, .MuiInput-underline:before', {
  borderBottomColor: `${green100} !important`,
});

css.global('.MuiInput-underline:hover:not(.Mui-disabled):before', {
  borderBottomColor: `${green500} !important`,
});

// icons

// material-ui
export const MATERIAL = {
  textField: {
    underlineStyle: {
      borderColor: green100
    },
    underlineFocusStyle: {
      borderColor: green500
    }
  }
}
