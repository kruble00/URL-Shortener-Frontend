'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function RedirectPage() {
  const params = useParams()
  const shortCode = params.shortCode
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const redirect = async () => {
      try {
        const response = await fetch(`${API_URL}/urls/lookup/${shortCode}`)
        
        if (response.ok) {
          const data = await response.json()
          
          if (data.originalUrl) {
            let redirectUrl = data.originalUrl
            if (!redirectUrl.startsWith('http://') && !redirectUrl.startsWith('https://')) {
              redirectUrl = 'https://' + redirectUrl
            }
            
            window.location.href = redirectUrl
            return
          }
        }
        
        setError(true)
        setLoading(false)
      } catch (err) {
        console.error('Error during redirect:', err)
        setError(true)
        setLoading(false)
      }
    }

    if (shortCode) {
      setTimeout(redirect, 1500)
    }
  }, [shortCode])

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '48px',
      textAlign: 'center',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      maxWidth: '500px',
      width: '100%'
    },
    loadingIcon: {
      width: '80px',
      height: '80px',
      margin: '0 auto 32px',
      background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: '4px solid rgba(255, 255, 255, 0.3)',
      borderTop: '4px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    errorIcon: {
      width: '80px',
      height: '80px',
      margin: '0 auto 32px',
      background: 'linear-gradient(135deg, #fc8181 0%, #e53e3e 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '36px',
      color: 'white'
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1a202c',
      marginBottom: '16px'
    },
    subtitle: {
      fontSize: '18px',
      color: '#4a5568',
      marginBottom: '32px',
      lineHeight: '1.5'
    },
    codeDisplay: {
      background: '#f7fafc',
      padding: '16px',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      marginBottom: '32px'
    },
    code: {
      fontFamily: 'Monaco, "Lucida Console", monospace',
      color: '#4299e1',
      fontSize: '16px',
      fontWeight: '600'
    },
    button: {
      background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
      color: 'white',
      padding: '16px 32px',
      fontSize: '16px',
      fontWeight: '600',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'all 0.3s ease'
    },
    loadingDots: {
      display: 'flex',
      justifyContent: 'center',
      gap: '8px'
    },
    dot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: '#4299e1'
    }
  }

  if (error) {
    return (
      <div style={styles.container}>
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
        <div style={styles.card}>
          <div style={styles.errorIcon}>
            !
          </div>
          <h1 style={styles.title}>Link Not Found</h1>
          <p style={styles.subtitle}>
            The shortened URL you're looking for doesn't exist or has been removed.
          </p>
          <div style={styles.codeDisplay}>
            <code style={styles.code}>
              kshort.vercel.app/r/{shortCode}
            </code>
          </div>
          <a 
            href="/" 
            style={styles.button}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 10px 20px rgba(66, 153, 225, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = 'none'
            }}
          >
            Create New Short Link
          </a>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        .bounce-1 { animation: bounce 1.4s infinite 0s; }
        .bounce-2 { animation: bounce 1.4s infinite 0.2s; }
        .bounce-3 { animation: bounce 1.4s infinite 0.4s; }
      `}</style>
      <div style={styles.card}>
        <div style={styles.loadingIcon}>
          <div style={styles.spinner}></div>
        </div>
        <h1 style={styles.title}>Redirecting...</h1>
        <p style={styles.subtitle}>
          Taking you to your destination in just a moment
        </p>
        <div style={styles.codeDisplay}>
          <div style={{ marginBottom: '8px', color: '#4a5568', fontSize: '14px' }}>
            <span style={{ color: '#4299e1', fontWeight: 'bold' }}>kshort</span>.vercel.app
          </div>
          <code style={styles.code}>
            /r/{shortCode}
          </code>
        </div>
        <div style={styles.loadingDots}>
          <div style={styles.dot} className="bounce-1"></div>
          <div style={styles.dot} className="bounce-2"></div>
          <div style={styles.dot} className="bounce-3"></div>
        </div>
      </div>
    </div>
  )
}