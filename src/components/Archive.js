import React, { useState } from "react"
import axios from "../axios-exp"
import URLGenerator from "../components/URLGenerator/URLGenerator"
import Button from "@material-ui/core/Button"

const Archive = () => {
  const defaultState = {
    elements: {
      SpenderId: "1",
      Price: 0,
      StuffName: "1",
      Description: "1",
      Type: 1
    }
  }
  const url = URLGenerator(defaultState)
  const callArchiveSells = () => {
    axios
      .get(`/api/HouseCost/ArchiveSell`)
      .then(data => {
        alert("Archived")
      })
      .catch(error => console.log(JSON.stringify(error, undefined, 2)))
  }

  return (
    <Button size="small" variant="contained" onClick={callArchiveSells}>
      Archive
    </Button>
  )
}

export default Archive
