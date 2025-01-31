import { Button, ButtonGroup } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import { memo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { EditPost, Response, TidObj } from '@/interfaces';
import { uploadFile } from '@/lib/utils';
import { Loading } from '@/components/misc/alert';
import { axiosInstance } from '@/lib/fetcher';

function NewBottom() {
  const { getValues, setError } = useFormContext<EditPost>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  async function onPublish(isPublic = true) {
    const session = await getSession();
    const vals = getValues();

    // upload cover image
    let coverImageUrl: string = '';
    if (vals.cover_image) {
      try {
        setIsLoading(true);
        const result = await uploadFile(vals.cover_image);
        if (result?.data.data.success.length > 0) {
          coverImageUrl = `${process.env.NEXT_PUBLIC_WEB_BASE}/` + result.data.data.success[0].path;
        } else {
          setError('cover_image', { message: 'Unknown error' });
        }
      } catch (e: any) {
        setError('cover_image', { message: e.message ?? 'Unknown error' });
      } finally {
        setIsLoading(false);
      }
    }

    // save post
    try {
      const ids: TidObj[] = [];
      vals.tags.map((v) => {
        ids.push({ id: parseInt(v) });
      });
      const payload = {
        cover_image: coverImageUrl,
        title: vals.title,
        content: vals.content,
        tags: ids,
        mode: isPublic ? 1 : 0,
        user_id: session?.user.id
      };

      setIsLoading(true);
      const { data } = await axiosInstance.post<Response<{ id: number }>>(
        `${process.env.NEXT_PUBLIC_API_BASE}/content/post`,
        payload
      );
      setIsLoading(false);
      router.push(`/post/${data.data.id}`);
    } catch (e: any) {
      setError('cover_image', { message: e.message ?? 'Unknown error' });
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ButtonGroup h="20" display="flex" alignItems="center">
      <Button onClick={() => onPublish()}>Publish</Button>
      <Button onClick={() => onPublish(false)} variant="flat" fontWeight="normal">
        Save draft
      </Button>
    </ButtonGroup>
  );
}

export default memo(NewBottom);
