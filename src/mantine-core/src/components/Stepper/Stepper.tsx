import React, { Children } from 'react';
import { MantineColor, DefaultProps, MantineNumberSize } from '@mantine/styles';
import { CheckboxIcon } from '../Checkbox';
import { Breadcrumbs } from '../Breadcrumbs';
import { Step } from './Step/Step';
import useStyles from './Stepper.styles';

export interface StepperProps extends DefaultProps {
  /** <Stepper.Step /> components only */
  children: React.ReactNode;

  /** Called when step is clicked */
  onStepClick?(stepIndex: number): void;

  /** Active step index */
  active: number;

  /** Step icon displayed when step is completed */
  completedIcon?: React.ReactNode;

  /** Step icon displayed when step is in progress */
  progressIcon?: React.ReactNode;

  /** Active and progress Step colors from theme.colors */
  color?: MantineColor;

  /** Step icon size in px */
  iconSize?: number;

  /** Content padding-top from theme.spacing or number to set value in px */
  contentPadding?: MantineNumberSize;
}

export function Stepper({
  className,
  children,
  onStepClick,
  active,
  completedIcon = <CheckboxIcon indeterminate={false} width={20} height={20} />,
  progressIcon,
  color,
  iconSize,
  contentPadding = 'md',
}: StepperProps) {
  const { classes, cx } = useStyles({ contentPadding }, { name: 'Stepper' });
  const filteredChildren = Children.toArray(children).filter(
    (item: React.ReactElement) => item.type === Step
  ) as React.ReactElement[];

  const items = filteredChildren.map((item, index) => (
    <Step
      {...item.props}
      icon={item.props.icon || index + 1}
      key={index}
      state={active === index ? 'stepProgress' : active > index ? 'stepCompleted' : 'stepInactive'}
      onClick={() => typeof onStepClick === 'function' && onStepClick(index)}
      completedIcon={item.props.completedIcon || completedIcon}
      progressIcon={item.props.progressIcon || progressIcon}
      color={item.props.color || color}
      iconSize={iconSize}
    />
  ));

  const content = filteredChildren[active]?.props?.children;

  return (
    <div className={cx(classes.root, className)}>
      <Breadcrumbs
        className={classes.steps}
        classNames={{ separator: classes.separator }}
        separator={<div />}
      >
        {items}
      </Breadcrumbs>
      {content && <div className={classes.content}>{content}</div>}
    </div>
  );
}

Stepper.Step = Step;
Stepper.displayName = '@mantine/core/Stepper';