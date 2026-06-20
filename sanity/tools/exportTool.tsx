import { useState } from 'react'
import { Button, Card, Flex, Heading, Stack, Text } from '@sanity/ui'
import { DownloadIcon } from '@sanity/icons'
import { useClient } from 'sanity'
import type { Tool } from 'sanity'

type Column = { header: string; value: (doc: Record<string, unknown>) => string }

type ExportConfig = {
  type: string
  label: string
  filename: string
  columns: Column[]
}

function formatDate(value: unknown): string {
  if (typeof value !== 'string') return ''
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleString()
}

const EXPORTS: ExportConfig[] = [
  {
    type: 'subscriber',
    label: 'Subscribers',
    filename: 'subscribers.csv',
    columns: [
      { header: 'Email', value: (d) => String(d.email ?? '') },
      { header: 'Subscribed At', value: (d) => formatDate(d.subscribedAt) },
    ],
  },
  {
    type: 'runClubSubscriber',
    label: 'Run Club Subscribers',
    filename: 'run-club-subscribers.csv',
    columns: [
      { header: 'First Name', value: (d) => String(d.firstName ?? '') },
      { header: 'Last Name', value: (d) => String(d.lastName ?? '') },
      { header: 'Email', value: (d) => String(d.email ?? '') },
      { header: 'Signed Up At', value: (d) => formatDate(d.subscribedAt) },
    ],
  },
  {
    type: 'enquiry',
    label: 'Enquiries',
    filename: 'enquiries.csv',
    columns: [
      { header: 'Name', value: (d) => String(d.name ?? '') },
      { header: 'Email', value: (d) => String(d.email ?? '') },
      { header: 'Message', value: (d) => String(d.message ?? '') },
      { header: 'Submitted At', value: (d) => formatDate(d.submittedAt) },
    ],
  },
]

function escapeCsvCell(cell: string): string {
  if (/[",\r\n]/.test(cell)) {
    return `"${cell.replace(/"/g, '""')}"`
  }
  return cell
}

function downloadCsv(filename: string, rows: string[][]) {
  const csv = rows.map((row) => row.map(escapeCsvCell).join(',')).join('\r\n')
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function ExportToolComponent() {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [loadingType, setLoadingType] = useState<string | null>(null)

  async function handleExport(config: ExportConfig) {
    setLoadingType(config.type)
    try {
      const docs: Record<string, unknown>[] = await client.fetch(
        `*[_type == $type] | order(_createdAt asc)`,
        { type: config.type }
      )
      const header = config.columns.map((c) => c.header)
      const rows = docs.map((doc) => config.columns.map((c) => c.value(doc)))
      downloadCsv(config.filename, [header, ...rows])
    } finally {
      setLoadingType(null)
    }
  }

  return (
    <Card padding={4} height="fill" overflow="auto">
      <Stack space={4} style={{ maxWidth: 480 }}>
        <Heading size={2}>Export Data</Heading>
        <Text size={1} muted>
          Download user information as a CSV file, which opens directly in Excel.
        </Text>
        <Stack space={3}>
          {EXPORTS.map((config) => (
            <Card key={config.type} padding={3} radius={2} shadow={1}>
              <Flex align="center" justify="space-between">
                <Text weight="semibold">{config.label}</Text>
                <Button
                  text="Download CSV"
                  icon={DownloadIcon}
                  tone="positive"
                  loading={loadingType === config.type}
                  disabled={loadingType !== null}
                  onClick={() => handleExport(config)}
                />
              </Flex>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Card>
  )
}

export const exportTool: Tool = {
  name: 'export',
  title: 'Export',
  icon: DownloadIcon,
  component: ExportToolComponent,
}
