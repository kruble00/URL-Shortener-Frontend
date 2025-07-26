// app/page.js - Refined design with fixed input and no emojis
'use client'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function Home() {
  const { user } = useUser()
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(false)
  const [copySuccess, setCopySuccess] = useState(null)

  const fetchUrls = async () => {
    if (!user) return
    
    try {
      const response = await fetch(`${API_URL}/urls/${user.id}`)
      const data = await response.json()
      setUrls(data.urls || [])
    } catch (error) {
      console.error('Error fetching URLs:', error)
    }
  }

  useEffect(() => {
    fetchUrls()
  }, [user])

  const handleShorten = async (e) => {
    e.preventDefault()
    if (!url || !user) return

    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: url, userId: user.id })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        const shortUrl = `${window.location.origin}/r/${data.shortCode}`
        setShortUrl(shortUrl)
        setUrl('')
        fetchUrls()
      } else {
        alert('Error creating short URL: ' + data.error)
      }
    } catch (error) {
      alert('Error connecting to server')
    }
    setLoading(false)
  }

  const handleDelete = async (shortCode) => {
    try {
      const response = await fetch(`${API_URL}/urls/${user.id}/${shortCode}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        fetchUrls()
      }
    } catch (error) {
      console.error('Error deleting URL:', error)
    }
  }

  const copyToClipboard = async (shortCode) => {
    const url = `${window.location.origin}/r/${shortCode}`
    try {
      await navigator.clipboard.writeText(url)
      setCopySuccess(shortCode)
      setTimeout(() => setCopySuccess(null), 2000)
    } catch (err) {
      alert('Failed to copy URL')
    }
  }

  // Styles
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '16px 0',
      position: 'sticky',
      top: 0,
      zIndex: 10
    },
    headerContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1a202c'
    },
    logoAccent: {
      color: '#4299e1'
    },
    main: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '40px 24px'
    },
    heroCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '60px 40px',
      textAlign: 'center',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    heroTitle: {
      fontSize: '56px',
      fontWeight: 'bold',
      color: '#1a202c',
      marginBottom: '20px',
      lineHeight: '1.2'
    },
    heroSubtitle: {
      fontSize: '22px',
      color: '#4a5568',
      marginBottom: '50px',
      lineHeight: '1.5'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '16px',
      padding: '32px',
      marginBottom: '24px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      overflow: 'hidden' // Prevent content overflow
    },
    formContainer: {
      maxWidth: '100%',
      margin: '0 auto'
    },
    input: {
      width: '100%',
      maxWidth: '100%', // Ensure it doesn't exceed container
      padding: '16px 20px',
      fontSize: '18px',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      fontFamily: 'inherit',
      boxSizing: 'border-box', // Include padding in width calculation
      marginBottom: '20px'
    },
    inputFocus: {
      borderColor: '#4299e1'
    },
    button: {
      background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
      color: 'white',
      padding: '16px 32px',
      fontSize: '18px',
      fontWeight: '600',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontFamily: 'inherit',
      width: '100%',
      maxWidth: '300px'
    },
    buttonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 20px rgba(66, 153, 225, 0.3)'
    },
    buttonDisabled: {
      opacity: '0.6',
      cursor: 'not-allowed',
      transform: 'none'
    },
    successCard: {
      background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
      color: 'white',
      padding: '24px',
      borderRadius: '12px',
      marginTop: '24px'
    },
    urlDisplay: {
      background: 'rgba(255, 255, 255, 0.2)',
      padding: '16px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginTop: '16px',
      flexWrap: 'wrap' // Allow wrapping on small screens
    },
    urlText: {
      flex: 1,
      minWidth: '0', // Allow text to shrink
      color: 'white',
      fontFamily: 'Monaco, "Lucida Console", monospace',
      fontSize: '16px',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    copyButton: {
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      padding: '8px 16px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      flexShrink: 0 // Prevent button from shrinking
    },
    sectionTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1a202c',
      marginBottom: '24px',
      textAlign: 'center'
    },
    urlItem: {
      background: '#f7fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '16px',
      transition: 'all 0.3s ease',
      wordBreak: 'break-all', // Prevent long URLs from overflowing
      overflow: 'hidden'
    },
    urlItemHover: {
      background: '#edf2f7',
      transform: 'translateY(-2px)',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
    },
    urlCode: {
      color: '#4299e1',
      fontFamily: 'Monaco, "Lucida Console", monospace',
      fontSize: '16px',
      fontWeight: '600',
      marginBottom: '8px',
      wordBreak: 'break-all'
    },
    urlOriginal: {
      color: '#4a5568',
      fontSize: '14px',
      marginBottom: '8px',
      wordBreak: 'break-all'
    },
    urlDate: {
      color: '#a0aec0',
      fontSize: '12px',
      marginBottom: '12px'
    },
    buttonGroup: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap'
    },
    deleteButton: {
      background: '#fc8181',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s ease'
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#4a5568'
    },
    emptyIcon: {
      fontSize: '48px',
      marginBottom: '16px',
      opacity: '0.5'
    },
    featureGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      marginTop: '40px'
    },
    featureCard: {
      background: 'rgba(255, 255, 255, 0.8)',
      padding: '32px 24px',
      borderRadius: '16px',
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.3)'
    },
    featureIcon: {
      width: '60px',
      height: '60px',
      background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      fontSize: '24px',
      color: 'white'
    },
    featureTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1a202c',
      marginBottom: '12px'
    },
    featureDescription: {
      color: '#4a5568',
      lineHeight: '1.5'
    }
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <h1 style={styles.logo}>
            <span style={styles.logoAccent}>k</span>short
          </h1>
          <SignedIn>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ color: '#4a5568', fontSize: '14px' }}>
                {user?.firstName}
              </span>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>
      </header>

      <main style={styles.main}>
        <SignedOut>
          <div style={styles.heroCard}>
            <h1 style={styles.heroTitle}>
              URL Shortener
            </h1>
            <p style={styles.heroSubtitle}>
              Transform long URLs into clean, shareable links with our elegant and powerful shortening service.
            </p>
            
            <div style={{ marginBottom: '40px' }}>
              <div style={styles.formContainer}>
                <input
                  type="url"
                  placeholder="https://example.com/your-very-long-url-here"
                  style={styles.input}
                  disabled
                />
                <div style={{ marginTop: '20px' }}>
                  <SignInButton mode="modal">
                    <button style={styles.button}>
                      Sign In to Start Shortening
                    </button>
                  </SignInButton>
                </div>
              </div>
            </div>

            {/* Features - No Emojis */}
            <div style={styles.featureGrid}>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>⚡</div>
                <h3 style={styles.featureTitle}>Lightning Fast</h3>
                <p style={styles.featureDescription}>
                  Instant URL shortening with optimized performance and global reach.
                </p>
              </div>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🔒</div>
                <h3 style={styles.featureTitle}>Secure & Private</h3>
                <p style={styles.featureDescription}>
                  Your data is protected with enterprise-grade security and privacy.
                </p>
              </div>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>📊</div>
                <h3 style={styles.featureTitle}>Easy Management</h3>
                <p style={styles.featureDescription}>
                  Simple dashboard to view, copy, and manage all your shortened URLs.
                </p>
              </div>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>Create Short Link</h2>
            
            <form onSubmit={handleShorten} style={{ textAlign: 'center' }}>
              <div style={styles.formContainer}>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste your long URL here..."
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = '#4299e1'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  required
                />
                <button
                  type="submit"
                  disabled={loading || !url}
                  style={{
                    ...styles.button,
                    ...(loading || !url ? styles.buttonDisabled : {})
                  }}
                  onMouseEnter={(e) => {
                    if (!loading && url) {
                      e.target.style.transform = 'translateY(-2px)'
                      e.target.style.boxShadow = '0 10px 20px rgba(66, 153, 225, 0.3)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading && url) {
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = 'none'
                    }
                  }}
                >
                  {loading ? 'Creating Short Link...' : 'Shorten URL'}
                </button>
              </div>
            </form>

            {shortUrl && (
              <div style={styles.successCard}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '20px' }}>
                  Success! Your link is ready
                </h3>
                <div style={styles.urlDisplay}>
                  <input
                    type="text"
                    value={shortUrl}
                    readOnly
                    style={styles.urlText}
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(shortUrl)
                      setCopySuccess('new')
                      setTimeout(() => setCopySuccess(null), 2000)
                    }}
                    style={{
                      ...styles.copyButton,
                      background: copySuccess === 'new' ? 'rgba(72, 187, 120, 0.3)' : 'rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    {copySuccess === 'new' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* URL Management */}
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>
              Your Links ({urls.length})
            </h2>
            
            {urls.length === 0 ? (
              <div style={styles.emptyState}>
                <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>No links yet</h3>
                <p>Create your first short link using the form above!</p>
              </div>
            ) : (
              <div>
                {urls.map((item) => (
                  <div
                    key={item.shortCode}
                    style={styles.urlItem}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#edf2f7'
                      e.target.style.transform = 'translateY(-2px)'
                      e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#f7fafc'
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = 'none'
                    }}
                  >
                    <div style={styles.urlCode}>
                      kshort.vercel.app/r/{item.shortCode}
                    </div>
                    <div style={styles.urlOriginal}>
                      → {item.originalUrl}
                    </div>
                    <div style={styles.urlDate}>
                      Created {new Date(item.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    <div style={styles.buttonGroup}>
                      <button
                        onClick={() => copyToClipboard(item.shortCode)}
                        style={{
                          ...styles.copyButton,
                          background: copySuccess === item.shortCode ? '#48bb78' : '#4299e1',
                          border: 'none',
                          color: 'white'
                        }}
                      >
                        {copySuccess === item.shortCode ? 'Copied!' : 'Copy Link'}
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Delete this link? This action cannot be undone.')) {
                            handleDelete(item.shortCode)
                          }
                        }}
                        style={styles.deleteButton}
                        onMouseEnter={(e) => e.target.style.background = '#e53e3e'}
                        onMouseLeave={(e) => e.target.style.background = '#fc8181'}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </SignedIn>
      </main>
    </div>
  )
}