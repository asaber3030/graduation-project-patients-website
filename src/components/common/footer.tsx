"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import { useTranslations } from "next-intl"
import routes from "@/lib/routes"

export function Footer() {
  const t = useTranslations()

  return (
    <footer className='bg-slate-900 text-white'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {/* Company Info */}
          <div>
            <h3 className='mb-4 text-xl font-bold'>Washcar</h3>
            <p className='mb-4 text-slate-300'>{t("footerDescription")}</p>
            <div className='flex space-x-4'>
              <Link href='#' className='text-slate-300 hover:text-white transition-colors'>
                <Facebook size={20} />
                <span className='sr-only'>Facebook</span>
              </Link>
              <Link href='#' className='text-slate-300 hover:text-white transition-colors'>
                <Twitter size={20} />
                <span className='sr-only'>Twitter</span>
              </Link>
              <Link href='#' className='text-slate-300 hover:text-white transition-colors'>
                <Instagram size={20} />
                <span className='sr-only'>Instagram</span>
              </Link>
              <Link href='#' className='text-slate-300 hover:text-white transition-colors'>
                <Linkedin size={20} />
                <span className='sr-only'>LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className='mb-4 text-xl font-bold'>{t("ourServices")}</h3>
            <ul className='space-y-2 text-slate-300'>
              <li>
                <Link href={routes.market} className='hover:text-white transition-colors'>
                  {t("products")}
                </Link>
              </li>
              <li>
                <Link href={routes.login} className='hover:text-white transition-colors'>
                  {t("login")}
                </Link>
              </li>
              <li>
                <Link href={routes.register} className='hover:text-white transition-colors'>
                  {t("register")}
                </Link>
              </li>
              <li>
                <Link href={routes.services("car-wash")} className='hover:text-white transition-colors'>
                  {t("carWash")}
                </Link>
              </li>
              <li>
                <Link href={routes.services("rent-car")} className='hover:text-white transition-colors'>
                  {t("rentingCars")}
                </Link>
              </li>
              <li>
                <Link href={routes.services("buy-car")} className='hover:text-white transition-colors'>
                  {t("buyCars")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='mb-4 text-xl font-bold'>{t("quickLinks")}</h3>
            <ul className='space-y-2 text-slate-300'>
              <li>
                <Link href='/' className='hover:text-white transition-colors'>
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href={routes.market} className='hover:text-white transition-colors'>
                  {t("products")}
                </Link>
              </li>
              <li>
                <Link href={routes.services("car-wash")} className='hover:text-white transition-colors'>
                  {t("carWash")}
                </Link>
              </li>
              <li>
                <Link href={routes.services("buy-car")} className='hover:text-white transition-colors'>
                  {t("buyCars")}
                </Link>
              </li>
              <li>
                <Link href={routes.services("rent-car")} className='hover:text-white transition-colors'>
                  {t("rentingCars")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='mb-4 text-xl font-bold'>{t("contactUs")}</h3>
            <div className='space-y-4 text-slate-300'>
              <div className='flex items-start'>
                <MapPin className='mr-2 h-5 w-5 shrink-0 text-slate-300' />
                <span>123 Auto Service Lane, Cartown, CT 12345</span>
              </div>
              <div className='flex items-center'>
                <Phone className='mr-2 h-5 w-5 shrink-0 text-slate-300' />
                <span>(555) 123-4567</span>
              </div>
              <div className='flex items-center'>
                <Mail className='mr-2 h-5 w-5 shrink-0 text-slate-300' />
                <span>info@washcarrent.com</span>
              </div>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className='mt-8 border-t border-slate-700 pt-8 text-center text-sm text-slate-400'>
          <p>
            © {new Date().getFullYear()} Washcar. {t("allRightsReserved")}.
          </p>
          <div className='mt-2 flex justify-center space-x-4'>
            <Link href='#' className='hover:text-white transition-colors'>
              {t("privacyPolicy")}
            </Link>
            <Link href='#' className='hover:text-white transition-colors'>
              {t("termsOfService")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
