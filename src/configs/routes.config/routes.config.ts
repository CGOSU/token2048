import { Component, lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
  {
    key: 'dashboard',
    path: '/dashboard',
    component: lazy(() => import('@/pages/examples/Dashboard')),
    authority: []
  },
  {
    key: 'users',
    path: '/users',
    component: lazy(() => import('@/pages/examples/Users')),
    authority: []
  },
  {
    key: 'pages',
    path: '/dashboard/pages',
    component: lazy(() => import('@/pages/examples/Pages')),
    authority: []
  },
  {
    key: 'files',
    path: '/dashboard/files',
    component: lazy(() => import('@/pages/examples/Files')),
    authority: []
  },
  {
    key: 'manage',
    path: '/users/manage',
    component: lazy(() => import('@/pages/examples/Manage')),
    authority: []
  },
  {
    key: "home",
    path: "/home",
    component: lazy(() => import("@/pages/Home")),
    authority: []
  },
  {
    key: "speaker",
    path: "/speaker",
    component: lazy(() => import("@/pages/Speaker")),
    authority: []
  },
  {
    key: "agenda",
    path: "/agenda",
    component: lazy(() => import("@/pages/Agenda")),
    authority: []
  },
  {
    key: "power_by",
    path: "/power_by",
    component: lazy(() => import("@/pages/PowerBy")),
    authority: []
  },
  {
    key: "highlight",
    path: "/highlight",
    component: lazy(() => import("@/pages/Highlight")),
    authority: []
  }
]
