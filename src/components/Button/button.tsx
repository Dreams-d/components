import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classNames from 'classnames'
export enum ButtonSize {
	Large = 'lg',
	Small = 'sm',
}

export enum ButtonType {
	Primary = 'primary',
	Default = 'default',
	Danger = 'danger',
	Link = 'link',
}

interface BaseButtonProps {
	className?: string
	disabled?: boolean
	size?: ButtonSize
	btnType?: ButtonType
	children: React.ReactNode
	href?: string
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>

type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

export const Button: FC<ButtonProps> = ({ className, btnType = ButtonType.Default, href, disabled = false, size, children, ...restProps }) => {
	// btn, btn-lg, btn-primary
	const classes = classNames('btn', className, {
		[`btn-${btnType}`]: btnType,
		[`btn-${size}`]: size,
		disabled: btnType === ButtonType.Link && disabled,
	})

	if (btnType === ButtonType.Link && href) {
		return (
			<a className={classes} href={href} {...restProps}>
				{children}
			</a>
		)
	} else {
		return (
			<button className={classes} disabled={disabled} {...restProps}>
				{children}
			</button>
		)
	}
}

export default Button
