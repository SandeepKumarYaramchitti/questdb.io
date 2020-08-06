import clsx from "clsx"
import Link from "@docusaurus/Link"
import useBaseUrl from "@docusaurus/useBaseUrl"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import React from "react"

import { Button, useMetadataContext } from "../../components"
import sectionStyles from "../../css/section.module.css"
import footerStyles from "./styles.module.css"

type Props = Readonly<{
  href?: string
  label: string
  to?: string
}>

const FooterLink = ({ to, href, label, ...props }: Props) => {
  const linkHref = useBaseUrl(href || "", { forcePrependBaseUrl: false })
  const linkTo = useBaseUrl(to || "")

  return (
    <Link
      className={footerStyles.footer__link}
      {...(href
        ? {
            href: linkHref,
            rel: "noopener noreferrer",
            target: "_blank",
          }
        : { to: linkTo })}
      {...props}
    >
      {label}
    </Link>
  )
}

const Footer = () => {
  const context = useDocusaurusContext()
  const metadataContext = useMetadataContext()
  const { siteConfig } = context
  const { themeConfig } = siteConfig
  const { footer } = themeConfig
  const { copyright, links } = footer

  return (
    <footer
      className={clsx(footerStyles.footer, sectionStyles.section, {
        [footerStyles["footer--alt"]]: metadataContext.altFooter === true,
      })}
    >
      <div
        className={clsx(
          footerStyles.footer__inner,
          sectionStyles["section--inner"],
        )}
      >
        <div
          className={clsx(
            footerStyles.footer__column,
            footerStyles["footer__column--left"],
          )}
        >
          <img
            alt="QuestDB logo"
            className={footerStyles.footer__logo}
            src="/img/footer/questdb.svg"
            title="QuestDB - Fastest open source database for time series and analytics"
          />
          <p className={footerStyles.footer__tagline}>{siteConfig.tagline}</p>

          <Button
            className={footerStyles.footer__github}
            href={siteConfig.customFields.githubUrl}
            icon={
              <img
                alt="GitHub logo"
                height="22"
                src="/img/github.svg"
                title="GitHub"
                width="22"
              />
            }
            size="xsmall"
            uppercase={false}
            variant="secondary"
          >
            Star us on GitHub
          </Button>
        </div>

        <div
          className={clsx(
            footerStyles.footer__column,
            footerStyles["footer__column--right"],
          )}
        >
          {links.map((linkItem, i) => (
            <div key={i} className={footerStyles.footer__links}>
              <ul className={footerStyles.footer__items}>
                {linkItem.title && (
                  <li className={footerStyles.footer__title}>
                    {linkItem.title}
                  </li>
                )}

                {linkItem.items &&
                  linkItem.items.map((item) => (
                    <li
                      className={footerStyles.footer__item}
                      key={item.href || item.to}
                    >
                      <FooterLink {...item} />
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className={footerStyles.footer__bottom}>
        <p
          className={footerStyles.footer__copyright}
          // Developer provided the HTML, so assume it's safe.
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: copyright,
          }}
        />
      </div>
    </footer>
  )
}

export default Footer
