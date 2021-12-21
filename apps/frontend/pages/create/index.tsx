import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import Input from '../../components/collection/Input'
import LoadingModal from '../../components/common/modals/LoadingModal'
import ToggleSwitch from '../../components/common/ToggleSwitch'
import useCreateERC1155 from '../../hooks/contracts/useCreateERC1155'
import CreateForm from '../../components/create/CreateForm'

export default function Create() {
  return (
    <div>
      <Head>
        <title>Create Nft</title>
      </Head>

      <Layout>
        <CreateForm />
      </Layout>
    </div>
  )
}
