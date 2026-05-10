import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { EventDetail } from '../components/event-detail'

describe('EventDetail Component', () => {
  const mockProps = {
    title: 'Test Event Title',
    date: '12 Okt 2024',
    imageUrl: 'https://placehold.co/1200x600',
    tags: ['EVENT', 'TEST'],
    parsedContent: '<p>This is a test content</p>',
    eventUrl: 'http://localhost:3000/event/test-event',
    caption: 'Test Caption',
  }

  it('renders the hero section correctly', () => {
    render(<EventDetail {...mockProps} />)
    
    // Check title
    expect(screen.getByText('Test Event Title')).toBeDefined()
    
    // Check author and date
    expect(screen.getByText('Admin')).toBeDefined()
    expect(screen.getByText('12 Okt 2024')).toBeDefined()
  })

  it('renders tags and badges correctly', () => {
    render(<EventDetail {...mockProps} />)
    
    expect(screen.getByText('EVENT')).toBeDefined()
    expect(screen.getByText('TEST')).toBeDefined()
  })

  it('renders the image and caption', () => {
    render(<EventDetail {...mockProps} />)
    
    const image = screen.getByAltText('Test Event Title')
    expect(image).toBeDefined()
    expect(image.getAttribute('src')).toBe(mockProps.imageUrl)

    expect(screen.getByText('Test Caption')).toBeDefined()
  })

  it('renders parsed markdown content', () => {
    render(<EventDetail {...mockProps} />)
    
    expect(screen.getByText('This is a test content')).toBeDefined()
  })
})
