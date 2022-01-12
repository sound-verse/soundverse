import React from 'react'
import styles from './SidebarFilters.module.scss'

function SidebarFilters() {
  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.filtersWrapper}>
        <h2 className={styles.filterText}>FILTER</h2>
        <ul>
          <li className={styles.filterItem}>Category</li>
          <li className={styles.filterItem}>Genre</li>
          <li className={styles.filterItem}>Trending</li>
          <li className={styles.filterItem}>New</li>
          <li className={styles.filterItem}>Bestsellers</li>
        </ul>
      </div>
    </div>
  )
}

export default SidebarFilters
