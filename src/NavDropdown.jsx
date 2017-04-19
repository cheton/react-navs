/* eslint no-continue: 0 */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Anchor from '@trendmicro/react-anchor';
import Dropdown from '@trendmicro/react-dropdown';
import splitComponentProps from './splitComponentProps';
import styles from './index.styl';

class NavDropdown extends Component {
    static propTypes = {
        ...Dropdown.propTypes,

        // Highlight the nav dropdown as active.
        active: PropTypes.bool,

        title: PropTypes.node.isRequired,

        // Whether to prevent a caret from being rendered next to the title.
        noCaret: PropTypes.bool
    };
    static defaultProps = {
        active: false,
        noCaret: false
    };

    actions = {
        handleClick: (event) => {
            if (this.props.onSelect) {
                event.preventDefault();

                if (!this.props.disabled) {
                    this.props.onSelect(this.props.eventKey, event);
                }
            }
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }
    isActive({ props }, activeKey, activeHref) {
        if (props.active) {
            return true;
        }

        if (activeKey !== undefined && props.eventKey === activeKey) {
            return true;
        }

        if (activeHref && props.href === activeHref) {
            return true;
        }

        if (typeof props.children !== 'object') {
            return false;
        }

        for (let child of props.children) {
            if (!React.isValidElement(child)) {
                continue;
            }

            if (this.isActive(child, activeKey, activeHref)) {
                return true;
            }
        }

        return false;
    }
    render() {
        const {
            title,
            noCaret,
            activeKey,
            activeHref,
            className,
            style,
            children,
            ...props
        } = this.props;
        const useCaret = !noCaret;

        const active = this.isActive(this, activeKey, activeHref);
        delete props.active;
        delete props.eventKey;

        const [dropdownProps, toggleProps] = splitComponentProps(props, Dropdown.ControlledComponent);

        toggleProps.componentClass = Anchor;

        const dropdownMenuItems = React.Children.map(children, child => {
            if (!React.isValidElement(child)) {
                return child;
            }

            return React.cloneElement(child, {
                active: this.isActive(child, activeKey, activeHref)
            });
        });

        return (
            <Dropdown
                {...dropdownProps}
                componentClass="li"
                className={classNames(className, { [styles.active]: active })}
                style={style}
            >
                <Dropdown.Toggle noCaret {...toggleProps}>
                    {title}
                    {useCaret &&
                    <span className={styles.caret} />
                    }
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {dropdownMenuItems}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

export default NavDropdown;
