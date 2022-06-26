// import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

export const login = async (req, res, next) => {
  try {
    const { public_url } = req.body.avatar
    if(!public_url) throw new Error('No file found')

  const dataURL = req.body.avatar.public_url        // 1. get dataURL
  const base64 = dataURL.split(';base64,').pop()    // 2. remove metadata only base64 encoded data
  const buf = Buffer.from(base64, 'base64')         // 3. convert base64 data to Binary buffer

  // (/)  /.next/server/pages/api   => (/)  /public
  const PUBLIC_ROOT = path.join(__dirname, '../../../../public') 

  await sharp(buf)
    .resize(150, 150)
    .toFormat('jpg')
    .toFile(`${PUBLIC_ROOT}/avatar.jpg`)

  res.status(200).json({
    status: 'success',
    user: 'ok'
  })

  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message
    })
  }

}