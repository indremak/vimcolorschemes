import boto3
import os

from print_helper import colors

S3_REPOSITORIES_DIRECTORY_NAME = os.getenv("S3_REPOSITORIES_DIRECTORY_NAME")
S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")
AWS_PROFILE_NAME = os.getenv("AWS_PROFILE_NAME")

session = boto3.session.Session(profile_name=AWS_PROFILE_NAME)
s3 = session.resource("s3")


def upload_file(file_name, data):
    try:
        print(f"Writing file {S3_REPOSITORIES_DIRECTORY_NAME}/{file_name} to s3...")
        s3.Bucket(S3_BUCKET_NAME).put_object(
            Key=f"{S3_REPOSITORIES_DIRECTORY_NAME}/{file_name}", Body=data
        )
    except Exception as e:
        print(
            f"{colors.ERROR}Error writing file {S3_REPOSITORIES_DIRECTORY_NAME}/{file_name} to s3...\n{e}{colors.NORMAL}"
        )