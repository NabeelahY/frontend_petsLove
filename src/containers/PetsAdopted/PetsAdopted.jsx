import React, { useCallback, useContext, useEffect, useState } from 'react'
import UserContext from 'Context/UserContext'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import Title from 'components/commons/Title'
import { LIMIT_LIST } from 'services/config'
import PaginationList from 'components/commons/PaginationList'
import ListPets from 'components/ListPets'
import Loading from 'components/commons/Loading'

const PetsAdopted = ({ id }) => {
  const [page, setPage] = useState(1)
  const [limit] = useState(LIMIT_LIST)
  const { t } = useTranslation('dashboard')
  const rootStore = useContext(UserContext)
  const { searchPetsStore } = rootStore

  useEffect(() => {
    searchPetsStore.getPetAdopted(id, LIMIT_LIST, page)
  }, [])

  const handleChangePage = useCallback((e, newPage) => {
    searchPetsStore.getPetAdopted(id, LIMIT_LIST, newPage)
    setPage(newPage)
  }, [])

  return (
    <>
      <Title mTop="50px" mBottom="30px" title={t('protectionistUser.petsAdopted')} />
      {searchPetsStore.isLoading ? (
        <Loading loadingRing />
      ) : (
        <>
          <ListPets isLoading={searchPetsStore.isLoading} pets={searchPetsStore.petsAdopted} />
          {searchPetsStore.totalPetsAdopted !== 0 && (
            <PaginationList
              page={page}
              limit={limit}
              handleChange={handleChangePage}
              total={searchPetsStore.totalPetsAdopted}
            />
          )}
        </>
      )}
    </>
  )
}

export default observer(PetsAdopted)
