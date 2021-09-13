import { createMemoStyles, MantineTheme, getSharedColorScheme } from '../../theme';

interface PaginationStyles {
  theme: MantineTheme;
  color: string;
}

export default createMemoStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: 0,
    padding: 0,
  },

  item: ({ theme }: PaginationStyles) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 500,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3]
    }`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    height: 32,
    width: 32,
    borderRadius: theme.radius.sm,
    lineHeight: 1,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,

    '&:not(:last-of-type), &:not(:first-of-type)': {
      marginLeft: theme.spacing.xs / 2,
    },

    '&:active:not($disabled):not($dots)': {
      transform: 'translateY(1px)',
    },
  }),

  active: ({ theme, color }: PaginationStyles) => {
    const colors = getSharedColorScheme({
      color,
      theme,
      variant: 'filled',
    });

    return {
      borderColor: 'transparent',
      color: colors.color,
      backgroundColor: colors.background,
    };
  },

  dots: () => ({
    cursor: 'default',
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  }),

  disabled: () => ({
    opacity: 0.6,
    cursor: 'not-allowed',
  }),
});