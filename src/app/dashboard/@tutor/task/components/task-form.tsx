'use client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

import { Button } from '@/components/ui/button';
import { Fragment, useState } from 'react';
import { Label } from '@/components/ui/label';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useTasks, { FormSchemaType } from '../hooks/useTasks';
import { AlertError } from '@/app/components/alert/Error';
import { AlertSuccess } from '@/app/components/alert/Success';

const TaskForm = ({ toggle }: { toggle: () => void }) => {
  const [isFile, setIsFile] = useState(false);
  const { form, post } = useTasks();
  const isLoading = form.formState.isSubmitting;
  async function onSubmit(values: FormSchemaType) {
    console.log(values);

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    post.mutate({ ...values });
    if (post.isError) {
    }
    if (post.isSuccess) {
    }
  }

  const toggleResourceMode = () => setIsFile((mode) => !mode);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {post.isError ? <AlertError message={post.error.message} /> : null}
        {post.isSuccess ? <AlertSuccess message={post.data.message} /> : null}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <div>
                  <ReactQuill {...field} theme="snow" value={field.value} onChange={field.onChange} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="resources"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resources</FormLabel>
              <FormControl>
                <Fragment>
                  {isFile ? (
                    <Input multiple type="file" {...field} disabled={isLoading} />
                  ) : (
                    <Input
                      type="text"
                      {...field}
                      disabled={isLoading}
                      onChange={(event) => field.onChange([event.target.value])}
                    />
                  )}
                  <div className="flex items-center space-x-2">
                    <Switch id="file-mode" checked={isFile} onCheckedChange={toggleResourceMode} />
                    <Label htmlFor="file-mode">File Mode</Label>
                  </div>
                </Fragment>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="point"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Points</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(event) => field.onChange(parseInt(event.target.value))}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deadline</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end mt-5 gap-2">
          <Button variant="outline" type="button" onClick={toggle} disabled={isLoading}>
            Close
          </Button>
          <Button disabled={isLoading}>Add</Button>
        </div>
      </form>
    </Form>
  );
};

export default TaskForm;
