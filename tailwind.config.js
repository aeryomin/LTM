module.exports = {
  purge: ['./client/**/*.html', './client/**/*.jsx', './client/**/*.js'],
  // purge: {
  //   enabled: false
  // },
  theme: {
    extend: {
      fontFamily: {
        'custom-content': ['Neucha']
      },
      height: {
        'custom-5vh': '5vh',
        'custom-10vh': '10vh',
        'custom-15vh': '15vh',
        'custom-20vh': '20vh',
        'custom-25vh': '25vh',
        'custom-30vh': '30vh',
        'custom-35vh': '35vh',
        'custom-40vh': '40vh',
        'custom-45vh': '45vh',
        'custom-50vh': '50vh',
        'custom-55vh': '55vh',
        'custom-60vh': '60vh',
        'custom-65vh': '65vh',
        'custom-70vh': '70vh',
        'custom-75vh': '75vh',
        'custom-80vh': '80vh',
        'custom-85vh': '85vh',
        'custom-90vh': '90vh',
        'custom-95vh': '95vh'
      },
      maxHeight: {
        'custom-80vh': '80vh'
      },
      minHeight: {
        'custom-5vh': '5vh'
      },
      inset: {
        '1/2': '50%'
      },
      minWidth: {
        0: '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '2/6': '33.333333%',
        '4/6': '66.666667%',
        full: '100%'
      },
      backgroundImage: {
        'custom-main-page': "url('../images/main-page.webp')",
        'custom-groups-profile': "url('../images/groups-profile.webp')",
        'custom-login': "url('../images/login.webp')"
      }
    }
  },
  variants: {},
  plugins: []
}
