import React from 'react'
import './PageLayout.scss'

export interface PageLayoutProps {
  header: React.ReactNode
  sidebar: React.ReactNode
  content: React.ReactNode
}

export const PageLayout: React.FC<PageLayoutProps> = ({header, sidebar, content}) => {
  return (
    <div className="wrapper">
      <header className="main-head" data-testid='header-section'>{header}</header>
      <aside className="sidebar" data-testid='sidebar-section'>
        {sidebar}
      </aside>
      <article className="content" data-testid='content-section'>
        {content}
      </article>
    </div>
  )
}
