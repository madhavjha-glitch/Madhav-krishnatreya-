import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, AlertCircle, Phone, Mail, MapPin, Sparkles } from 'lucide-react';
import ThreeDCard from './ThreeDCard';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMsg, setResponseMsg] = useState<{ success: boolean; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMsg(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setResponseMsg({ success: true, text: result.message || 'Thank you! Your message has been sent.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setResponseMsg({ success: false, text: result.error || 'Something went wrong. Please try again.' });
      }
    } catch (err) {
      setResponseMsg({ success: false, text: 'Network error. Please check if your server is running.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 14,
      },
    },
  };

  return (
    <section id="contact" className="py-20 bg-transparent border-b border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-1.5 px-4 py-1.5 border border-slate-800 bg-slate-900 text-slate-300 text-xs font-mono font-bold uppercase tracking-widest mb-3 rounded-full transition-colors duration-300 shadow-md"
          >
            <span>Get In Touch</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-white font-sans tracking-tight transition-colors duration-300"
          >
            Start A Discussion
          </motion.h2>
          <div className="w-16 h-[1px] bg-slate-850 mx-auto mt-4" />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-stretch"
        >
          {/* Contact Details Pane */}
          <motion.div
            variants={childVariants}
            className="lg:col-span-5"
          >
            <ThreeDCard className="w-full h-full">
              <div className="bg-slate-900 border border-slate-850 text-slate-300 rounded-3xl p-8 md:p-10 flex flex-col justify-between shadow-md hover:shadow-lg relative transition-colors duration-300 w-full h-full">
                
                <div>
                  <span className="inline-flex items-center space-x-1.5 text-slate-300 text-xs font-mono font-bold uppercase tracking-widest mb-6 rounded-full border border-slate-800 bg-slate-950 px-3 py-1.5 transition-colors duration-300">
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                    <span>Let's Connect</span>
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold font-sans tracking-tight mb-4 uppercase text-white">Contact Info</h3>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-8 font-sans transition-colors duration-300">
                    Reach out for internship positions, consulting queries, digital campaign strategies, or custom Excel spreadsheet consulting. I will reply within 24 hours.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 border border-slate-800 bg-slate-950 flex items-center justify-center text-sky-400 shrink-0 rounded-full transition-colors duration-300">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest transition-colors duration-300">Direct Phone</p>
                        <a href="tel:9990715771" className="text-sm md:text-base font-bold text-slate-200 hover:text-sky-400 transition-colors duration-300">
                          9990715771
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 border border-slate-800 bg-slate-950 flex items-center justify-center text-sky-400 shrink-0 rounded-full transition-colors duration-300">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest transition-colors duration-300">Professional Email</p>
                        <a href="mailto:madhavjha514@gmail.com" className="text-sm md:text-base font-bold text-slate-200 hover:text-sky-400 transition-colors break-all duration-300">
                          madhavjha514@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 border border-slate-800 bg-slate-950 flex items-center justify-center text-sky-400 shrink-0 rounded-full transition-colors duration-300">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest transition-colors duration-300">Location</p>
                        <p className="text-sm md:text-base font-bold text-slate-200 transition-colors duration-300">
                          Faridabad, Haryana
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-6 mt-8 transition-colors duration-300">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 transition-colors duration-300">ESTABLISHED WORKFLOW:</span>
                  <p className="text-xs text-slate-400 mt-1 font-sans transition-colors duration-300">
                    Data privacy guaranteed. Your queries are secured with industry standards.
                  </p>
                </div>
              </div>
            </ThreeDCard>
          </motion.div>

          {/* Form Pane */}
          <motion.div
            variants={childVariants}
            className="lg:col-span-7"
          >
            <ThreeDCard className="w-full h-full">
              <div className="bg-slate-900 border border-slate-850 p-8 md:p-10 rounded-3xl shadow-md flex flex-col justify-center transition-colors duration-300 w-full h-full">
            <AnimatePresence mode="wait">
              {responseMsg?.success ? (
                <motion.div
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   className="text-center py-8"
                >
                  <div className="w-16 h-16 border border-slate-800 bg-slate-950 text-sky-400 flex items-center justify-center mx-auto mb-6 rounded-full">
                    <CheckCircle className="w-7 h-7 text-sky-400" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white mb-3 font-sans transition-colors duration-300">Submission Received!</h3>
                  <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto font-sans transition-colors duration-300">{responseMsg.text}</p>
                  <button
                    onClick={() => setResponseMsg(null)}
                    className="px-6 py-2.5 bg-sky-600 text-white hover:bg-sky-700 font-mono text-xs font-bold uppercase tracking-widest rounded-full transition-all cursor-pointer shadow-sm"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {responseMsg && !responseMsg.success && (
                    <div className="flex items-center space-x-3 p-4 rounded-2xl bg-red-950/40 border border-red-900 text-red-200 text-xs font-sans">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <p>{responseMsg.text}</p>
                    </div>
                  )}

                  <div className="relative">
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder=" "
                      className="peer w-full px-5 pt-6 pb-2.5 bg-slate-950 border border-slate-850 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:bg-slate-900 rounded-full outline-none text-slate-100 font-sans text-sm transition-all font-medium duration-300"
                    />
                    <label
                      htmlFor="contact-name"
                      className="absolute left-5 text-slate-500 transition-all duration-300 pointer-events-none origin-left text-[9px] font-mono font-bold uppercase tracking-widest top-1.5
                      peer-placeholder-shown:text-sm peer-placeholder-shown:font-sans peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:top-3.5
                      peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-mono peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-sky-400"
                    >
                      Your Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder=" "
                      className="peer w-full px-5 pt-6 pb-2.5 bg-slate-950 border border-slate-850 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:bg-slate-900 rounded-full outline-none text-slate-100 font-sans text-sm transition-all font-medium duration-300"
                    />
                    <label
                      htmlFor="contact-email"
                      className="absolute left-5 text-slate-500 transition-all duration-300 pointer-events-none origin-left text-[9px] font-mono font-bold uppercase tracking-widest top-1.5
                      peer-placeholder-shown:text-sm peer-placeholder-shown:font-sans peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:top-3.5
                      peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-mono peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-sky-400"
                    >
                      Email Address
                    </label>
                  </div>

                  <div className="relative">
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder=" "
                      className="peer w-full px-5 pt-6 pb-3 bg-slate-950 border border-slate-850 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:bg-slate-900 rounded-2xl outline-none text-slate-100 font-sans text-sm transition-all font-medium resize-none duration-300"
                    />
                    <label
                      htmlFor="contact-message"
                      className="absolute left-5 text-slate-500 transition-all duration-300 pointer-events-none origin-left text-[9px] font-mono font-bold uppercase tracking-widest top-1.5
                      peer-placeholder-shown:text-sm peer-placeholder-shown:font-sans peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:top-3.5
                      peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-mono peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-sky-400"
                    >
                      Message details
                    </label>
                  </div>

                  <button
                    id="contact-submit-button"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-sky-600 text-white hover:bg-sky-700 hover:scale-[1.01] font-mono text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
                  >
                    {isSubmitting ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-white" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
              </div>
            </ThreeDCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
