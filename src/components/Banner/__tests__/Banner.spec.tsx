import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import Banner from '../Banner';

// Mock `useRouter` from Next.js
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next/image', () => (props: any) => {
  // Mock Next.js `Image` component
  return <img {...props} alt={props.alt} />;
});

describe('Banner Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    mockPush.mockClear();
  });

  test('renders correctly with initial image', () => {
    render(<Banner />);
    const bannerImage = screen.getByAltText('Banner background');
    expect(bannerImage).toHaveAttribute('src', '/img/space3.jpg');
    expect(screen.getByText('Book Your Ideal Workspace')).toBeInTheDocument();
    expect(screen.getByText('Find spaces that inspire productivity')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Explore Coworking Spaces/i })).toBeInTheDocument();
  });

  test('cycles images on click', () => {
    render(<Banner />);

    const bannerImage = screen.getByAltText('Banner background');

    // Simulate clicking the banner to change images
    fireEvent.click(bannerImage);
    expect(bannerImage).toHaveAttribute('src', '/img/space2.jpg');

    fireEvent.click(bannerImage);
    expect(bannerImage).toHaveAttribute('src', '/img/space1.jpg');

    fireEvent.click(bannerImage);
    expect(bannerImage).toHaveAttribute('src', '/img/space4.jpg');

    fireEvent.click(bannerImage);
    expect(bannerImage).toHaveAttribute('src', '/img/space3.jpg'); // Back to the first image
  });

  test('navigates to coworking space page when button is clicked', () => {
    render(<Banner />);
    const exploreButton = screen.getByRole('button', { name: /Explore Coworking Spaces/i });

    fireEvent.click(exploreButton);
    expect(mockPush).toHaveBeenCalledWith('/coworkingspace');
  });

  test('prevents cycling images when button is clicked', () => {
    render(<Banner />);

    const bannerImage = screen.getByAltText('Banner background');
    const exploreButton = screen.getByRole('button', { name: /Explore Coworking Spaces/i });

    fireEvent.click(bannerImage); // Change image
    expect(bannerImage).toHaveAttribute('src', '/img/space2.jpg');

    fireEvent.click(exploreButton); // Button click should not change image
    expect(bannerImage).toHaveAttribute('src', '/img/space2.jpg');
  });
});
