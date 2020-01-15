import React from 'react'
import { css } from 'glamor'
import UnderConstruction from '../components/UnderConstruction'

export default function RecipesRoute(props) {
  return (
    <div {...css({ height: '100%' })}>
      <UnderConstruction section="Recipes" />
    </div>
  )
}
