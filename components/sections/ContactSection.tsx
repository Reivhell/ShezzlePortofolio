
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { Mail, MapPin, Phone, Send, Loader2, Sparkles } from 'lucide-react'
import InputField from '@/components/ui/InputField'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const supabase = createClient()

    const { error: insertError } = await supabase.from('portfolio_comments').insert({
      user_name: formData.name,
      email: formData.email,
      content: formData.message,
      created_at: new Date().toISOString(),
    })

    if (insertError) {
      setSubmitStatus('error')
      console.error('Error submitting comment:', insertError)
    } else {
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    }

    setIsSubmitting(false)
    setTimeout(() => setSubmitStatus('idle'), 3000)
  }

  return (
    <section id="Contact" className="py-20 px-[5%] sm:px-[5%] lg:px-[10%]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block relative group">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
              Contact Me
            </h2>
          </div>
          <p className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Let&apos;s work together on your next project
            <Sparkles className="w-5 h-5 text-purple-400" />
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-4 rounded-xl bg-indigo-500/20">
                <Mail className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Email</h3>
                <a href="mailto:davidaell3@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                  davidaell3@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-4 rounded-xl bg-indigo-500/20">
                <Phone className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Phone</h3>
                <a href="tel:+6281999136849" className="text-gray-400 hover:text-white transition-colors">
                  +62 819 9913 684
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-4 rounded-xl bg-indigo-500/20">
                <MapPin className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Location</h3>
                <p className="text-gray-400">Indonesia</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your name"
              required
            />

            <InputField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              required
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Your message..."
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>

            {submitStatus === 'success' && (
              <p className="text-green-400 text-center">Message sent successfully!</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-400 text-center">Failed to send message. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
